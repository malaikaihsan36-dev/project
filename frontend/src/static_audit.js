const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '.');

// Valid routes defined in App.js
const validRoutes = new Set([
  '/',
  '/about',
  '/why-colourpix',
  '/why-choose-us',
  '/trust-center',
  '/trust',
  '/services',
  '/service/:serviceId', // regex matching needed for parameterized routes
  '/packaging',
  '/finishes',
  '/industries',
  '/manufacturing',
  '/portfolio',
  '/resources',
  '/knowledge-center',
  '/blog',
  '/contact',
  '/estimator',
  '/cost-estimator',
  '/catalog',
  '/products',
  '/customize/:id',
  '/customize',
  '/order/:orderId',
  '/design-page/:orderId',
  '/design-review',
  '/design-review/:orderId',
  '/chat',
  '/final-order/:orderId',
  '/final-order',
  '/reviews',
  '/read/:id',
  '/magazine/:id',
  '/admin-login',
  '/admin',
  '/admin/orders',
  '/admin/products',
  '/admin/customers',
  '/admin/analytics',
  '/admin/portfolio',
  '/admin/reviews',
  '/admin/settings',
  '/admin/order-review/:orderId',
  '/admin/chat/:orderId'
]);

// Helper to check if a route is valid (resolves parameterized routes)
function isRouteValid(route) {
  if (route.startsWith('http') || route.startsWith('#') || route.startsWith('tel:') || route.startsWith('mailto:')) {
    return true;
  }
  
  // Clean query params or hashes
  const cleanRoute = route.split('?')[0].split('#')[0];
  if (validRoutes.has(cleanRoute)) return true;
  
  // Check parameterized routes matching
  for (const validRoute of validRoutes) {
    if (validRoute.includes('/:')) {
      const parts = validRoute.split('/');
      const routeParts = cleanRoute.split('/');
      if (parts.length === routeParts.length) {
        let match = true;
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].startsWith(':')) continue;
          if (parts[i] !== routeParts[i]) {
            match = false;
            break;
          }
        }
        if (match) return true;
      }
    }
  }
  return false;
}

// Recursively find files
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'build') {
        results = results.concat(getFiles(filePath));
      }
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const files = getFiles(srcDir);
const issues = [];
const checkedLinksCount = { ok: 0, bad: 0 };
const checkedImportsCount = { ok: 0, bad: 0 };

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(srcDir, file);

  // 1. Audit Router Links (`to="xxx"` and `to={'xxx'}`)
  // Find all to="..." or to={...} links
  const toRegex = /\bto=(?:{`([^`]+)`}|{"([^"]+)"}|'([^']+)'|"([^"]+)"|{([^}]+)})/g;
  let match;
  while ((match = toRegex.exec(content)) !== null) {
    const route = match[1] || match[2] || match[3] || match[4] || match[5];
    if (route && !route.includes('${') && !route.includes('state') && !route.startsWith('http') && !route.startsWith('#')) {
      if (!isRouteValid(route)) {
        issues.push({
          file: relPath,
          type: 'BROKEN_LINK',
          detail: `Reference to invalid route/path: "${route}"`
        });
        checkedLinksCount.bad++;
      } else {
        checkedLinksCount.ok++;
      }
    }
  }

  // 2. Audit programmatic navigate(...) calls
  const navRegex = /\bnavigate\(\s*(?:`([^`]+)`|'([^']+)'|"([^"]+)"|([^)]+))\s*\)/g;
  while ((match = navRegex.exec(content)) !== null) {
    const route = match[1] || match[2] || match[3];
    if (route && !route.includes('${')) {
      if (!isRouteValid(route)) {
        issues.push({
          file: relPath,
          type: 'BROKEN_NAVIGATE',
          detail: `navigate() to invalid route/path: "${route}"`
        });
        checkedLinksCount.bad++;
      } else {
        checkedLinksCount.ok++;
      }
    }
  }

  // 3. Audit Local File Imports
  const importRegex = /\b(?:import|require)\b.*?(?:from\s+)?['"](\.\.?\/.*?)['"]/g;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    // Check if imported file exists
    // Resolve relative path
    let resolved = path.resolve(path.dirname(file), importPath);
    let exists = false;
    const extensions = ['', '.js', '.jsx', '.json', '.svg', '.png', '.jpg', '.css'];
    
    for (const ext of extensions) {
      if (fs.existsSync(resolved + ext) && !fs.statSync(resolved + ext).isDirectory()) {
        exists = true;
        break;
      }
      // If it has index.js/jsx in subdirectory
      const indexResolved = path.join(resolved, 'index');
      if (fs.existsSync(indexResolved + ext) && !fs.statSync(indexResolved + ext).isDirectory()) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      issues.push({
        file: relPath,
        type: 'BROKEN_IMPORT',
        detail: `Import target not found: "${importPath}" (resolved to: ${resolved})`
      });
      checkedImportsCount.bad++;
    } else {
      checkedImportsCount.ok++;
    }
  }
  
  // 4. Audit Image Tags and Public Folder Assets (paths containing `/images/` or direct references to standard assets)
  const imageRegex = /src=["']\/images\/([^"']+)["']/g;
  while ((match = imageRegex.exec(content)) !== null) {
    const imgName = match[1];
    const publicImgPath = path.resolve(srcDir, '../public/images', imgName);
    if (!fs.existsSync(publicImgPath)) {
      issues.push({
        file: relPath,
        type: 'MISSING_IMAGE',
        detail: `Image asset missing from public folder: "/images/${imgName}"`
      });
    }
  }
});

console.log("=== STATIC AUDIT RESULTS ===");
console.log(`Checked Links: ${checkedLinksCount.ok} OK, ${checkedLinksCount.bad} FAILED`);
console.log(`Checked Imports: ${checkedImportsCount.ok} OK, ${checkedImportsCount.bad} FAILED`);
console.log(`Total Issues Found: ${issues.length}\n`);

if (issues.length > 0) {
  issues.forEach(issue => {
    console.log(`[${issue.type}] in ${issue.file}: ${issue.detail}`);
  });
} else {
  console.log("No issues found in static files analysis! Everything compiles and links correctly.");
}
