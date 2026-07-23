import { jsPDF } from 'jspdf';

// Helper to fetch dynamic images (like QR Codes or photography) and convert them to Base64
const getBase64FromUrl = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to convert image to base64'));
    });
  } catch (error) {
    console.error('Error fetching base64 image:', error);
    return null;
  }
};

// Infographic drawer helpers using native jsPDF vector primitives
const drawDielineInfographic = (doc, x, y) => {
  doc.setDrawColor(220, 20, 60); // Red crease lines
  doc.setLineWidth(0.5);
  
  // Draw folding carton dieline layout outline
  doc.rect(x + 10, y + 10, 50, 40); // Main body
  doc.rect(x + 10, y - 20, 50, 30); // Top flap
  doc.rect(x + 10, y + 50, 50, 30); // Bottom flap
  doc.rect(x - 20, y + 10, 30, 40); // Left flap
  doc.rect(x + 60, y + 10, 30, 40); // Right flap
  
  // Dotted crease lines
  doc.setDrawColor(37, 99, 235); // Blue cut lines
  doc.setLineDashPattern([2, 2], 0);
  doc.line(x + 10, y + 10, x + 10, y + 50);
  doc.line(x + 60, y + 10, x + 60, y + 50);
  doc.line(x + 10, y + 10, x + 60, y + 10);
  doc.line(x + 10, y + 50, x + 60, y + 50);
  doc.setLineDashPattern([], 0); // Reset

  // Text labels
  doc.setTextColor(30, 41, 59);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('3D STRUCTURAL DIELINE (ArtiosCAD)', x - 15, y - 28);
  doc.setFont('Helvetica', 'normal');
  doc.text('Cut Line (Solid)', x - 15, y + 100);
  doc.text('Crease/Fold (Dotted)', x - 15, y + 106);
  
  doc.setDrawColor(37, 99, 235);
  doc.line(x + 20, y + 100, x + 35, y + 100);
  doc.setDrawColor(220, 20, 60);
  doc.setLineDashPattern([1, 1], 0);
  doc.line(x + 20, y + 106, x + 35, y + 106);
  doc.setLineDashPattern([], 0);
};

const drawColorMatrixInfographic = (doc, x, y) => {
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('HEIDELBERG SPEEDMASTER XL DENSITY MATRIX', x, y - 10);
  
  // Draw CMYK color control bars
  const colors = [
    { name: 'Cyan', r: 0, g: 163, b: 224 },
    { name: 'Magenta', r: 236, g: 0, b: 140 },
    { name: 'Yellow', r: 255, g: 242, b: 0 },
    { name: 'Black', r: 35, g: 31, b: 32 }
  ];
  
  colors.forEach((col, idx) => {
    doc.setFillColor(col.r, col.g, col.b);
    doc.rect(x + (idx * 28), y, 25, 12, 'F');
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7);
    doc.text(col.name, x + (idx * 28), y + 18);
  });

  // Printing registration target icon
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.5);
  doc.circle(x + 130, y + 6, 8, 'D');
  doc.line(x + 118, y + 6, x + 142, y + 6);
  doc.line(x + 130, y - 6, x + 130, y + 18);
};

const drawFinishesInfographic = (doc, x, y) => {
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('TACTILE SURFACE FINISH LAYERS', x, y - 8);

  // Draw layered 3D step blocks
  // Bottom layer: Substrate
  doc.setFillColor(244, 244, 245);
  doc.setDrawColor(212, 212, 216);
  doc.rect(x, y + 20, 100, 15, 'FD');
  doc.setTextColor(82, 82, 91);
  doc.setFont('Helvetica', 'normal');
  doc.text('1. Premium SBS Paperboard Substrate (350 GSM)', x + 5, y + 30);

  // Middle layer: Lamination
  doc.setFillColor(37, 99, 235);
  doc.rect(x + 10, y + 10, 90, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text('2. Velvet Soft-Touch Matte Laminate', x + 15, y + 17);

  // Top layer: Foil
  doc.setFillColor(234, 179, 8); // Gold
  doc.rect(x + 20, y, 80, 10, 'F');
  doc.setTextColor(30, 41, 59);
  doc.setFont('Helvetica', 'bold');
  doc.text('3. Precision Metallic Hot Gold Foiling', x + 25, y + 7);
};

const drawProcessTimelineInfographic = (doc, x, y) => {
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('MANUFACTURING TIMELINE PIPELINE', x, y - 10);

  const steps = [
    { num: 'P1', title: 'CAD Pre-Press', desc: '1:1 Prototype' },
    { num: 'P2', title: 'Press Run', desc: 'Heidelberg 6C' },
    { num: 'P3', title: 'Finishing', desc: 'Foil / Die-Cut' },
    { num: 'P4', title: 'Logistics', desc: 'AQL 1.0 Inspection' }
  ];

  steps.forEach((s, idx) => {
    // Circle node
    doc.setFillColor(37, 99, 235);
    doc.circle(x + (idx * 35) + 10, y + 10, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(s.num, x + (idx * 35) + 7, y + 12);

    // Connector lines
    if (idx < 3) {
      doc.setDrawColor(212, 212, 216);
      doc.setLineWidth(1);
      doc.line(x + (idx * 35) + 18, y + 10, x + ((idx + 1) * 35), y + 10);
    }

    // Step text labels
    doc.setTextColor(30, 41, 59);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(s.title, x + (idx * 35), y + 25);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(6);
    doc.text(s.desc, x + (idx * 35), y + 31);
  });
};

// Global Brochure Content Definitions
const BROCHURES = {
  "Company Profile": {
    title: "COMPANY PROFILE",
    subtitle: "TECHNICAL PLANT AUDIT & CORPORATE ROSTER",
    accent: "#2563EB",
    details: [
      { heading: "Direct Manufacturer Operations", body: "ColourPix operates as an LCCI-registered manufacturing plant (Member #1991-PK) in Lahore, Pakistan. We maintain full chain-of-custody control over all commercial offset printing, luxury box gluing, and custom finishes runs with zero third-party brokers." },
      { heading: "Machinery Capacity Roster", body: "Our plant is equipped with multi-color commercial offset presses (Heidelberg Speedmaster XL 6-Color, Komori Lithrone 4-Color), HP Indigo digital production presses, ArtiosCAD packaging design stations, and high-speed Bobst automatic die-cutters." },
      { heading: "Corporate Governance", body: "Founded in 1991, ColourPix has grown into an international supplier of custom folding cartons, labels, and rigid setup packaging. We maintain regional dispatch offices in Lahore, Karachi, and Islamabad, serving bulk supply chains worldwide." }
    ],
    infographic: drawColorMatrixInfographic
  },
  "Why ColourPix": {
    title: "WHY COLOURPIX?",
    subtitle: "THE MANUFACTURER DIFFERENCE & VALUE INDEX",
    accent: "#2563EB",
    details: [
      { heading: "Direct-to-Factory Rates", body: "By bypassing reseller brokers and broker networks, ColourPix delivers actual wholesale factory pricing on duplex cartons, e-commerce corrugated mailers, and custom retail labels." },
      { heading: "AQL 1.0 Quality Standard", body: "We employ optical scanners and manual technical audits to run AQL 1.0 sampling schedules. This guarantees strict dimensional fit tolerances, perfect Pantone color alignment, and glue joint burst thresholds." },
      { heading: "Structural Dieline Prototyping", body: "We support pre-press teams with physical unprinted 1:1 samples cut on our automated plotter desks before bulk manufacturing, ensuring 100% size accuracy and fit alignment." }
    ],
    infographic: drawDielineInfographic
  },
  "Trust Center": {
    title: "TRUST CENTER",
    subtitle: "COMPLIANCE, STANDARDS & ACCREDITATION",
    accent: "#000000",
    details: [
      { heading: "LCCI Registration & Verification", body: "ColourPix is a registered corporate member of the Lahore Chamber of Commerce & Industry (Reg #1991-PK), adhering to national export quality directives." },
      { heading: "Material Chain of Custody", body: "We source eco-certified duplex boards, virgin Kraft, and food-grade paperboard barrier sheets. All materials undergo burst factor, grain direction, and humidity testing." },
      { heading: "Zero Defect Policy", body: "Our quality assurance pipeline includes spectrophotometer ink calibration, bleed checks, and drop tests to verify structural integrity and printing longevity." }
    ],
    infographic: drawProcessTimelineInfographic
  },
  "Printing Solutions": {
    title: "PRINTING SOLUTIONS",
    subtitle: "COMMERCIAL OFFSET & INDUSTRIAL DIGITAL CAPABILITIES",
    accent: "#2563EB",
    details: [
      { heading: "High-Volume Heidelberg Press Run", body: "Ideal for high-volume cosmetics boxes, food take-away sleeves, and product packaging, operating at 15,000 sheets per hour with automated ink calibration." },
      { heading: "HP Indigo Digital Print Line", body: "Designed for variable data labels, limited edition retail product lines, prototype packaging runs, and rapid turnaround digital printing." },
      { heading: "Pantone Color Matching Alignment", body: "Using advanced spectrophotometers, we verify color accuracy with a Delta E tolerance threshold of < 1.5, ensuring uniform branding across catalogs." }
    ],
    infographic: drawColorMatrixInfographic
  },
  "Packaging Solutions": {
    title: "PACKAGING SOLUTIONS",
    subtitle: "LUXURY RIGID, FOLDING CARTONS & CORRUGATED BOXES",
    accent: "#2563EB",
    details: [
      { heading: "Bespoke Luxury Rigid Setup Boxes", body: "Premium heavy chipboard boxes (1000–2400 GSM) designed for cosmetics, perfume, electronics, and executive corporate gifting, featuring magnetic closures." },
      { heading: "Folding Cartons & Takeaway Sleeves", body: "SBS board and duplex cardstock folding boxes with custom windows, hangers, and structural dielines engineered for automated packing lines." },
      { heading: "Heavy-Duty Corrugated Mailers", body: "High crash-resistance shipping cartons custom printed in Kraft cardstocks for ecommerce logistics safety and sustainable packaging requirements." }
    ],
    infographic: drawDielineInfographic
  },
  "Premium Finishes": {
    title: "PREMIUM FINISHES",
    subtitle: "SURFACE EMBELLISHMENTS & LUXURY COATINGS",
    accent: "#EA580C",
    details: [
      { heading: "Metallic Hot Foil Stamping", body: "Adding precise gold, silver, rose gold, and holographic metallic foils to brand elements and logos, with zero peeling." },
      { heading: "Raised Spot UV & Gloss Contrast", body: "Selective UV varnishing applied over matte-laminated surfaces to create stunning tactile highlights and premium visual depth." },
      { heading: "Velvet Soft-Touch Lamination", body: "Applying scratch-resistant velvet finish films to the board substrate, offering a luxurious, high-end feel." }
    ],
    infographic: drawFinishesInfographic
  },
  "Manufacturing Process": {
    title: "MANUFACTURING PROCESS",
    subtitle: "END-TO-END WORKFLOW FROM DIELINE TO DELIVERY",
    accent: "#2563EB",
    details: [
      { heading: "Phase 1: Pre-Press & Prototype", body: "Every run begins with CAD dieline drafting, pre-flight file verification, and unprinted physical sample plotting for dimensional confirmation." },
      { heading: "Phase 2: Commercial Printing Run", body: "Approved layouts are fed into our automated Heidelberg offset press or HP Indigo digital lines, matching colors to the exact Pantone references." },
      { heading: "Phase 3: Embellishment & Assembly", body: "Printing sheets undergo hot foil stamping, embossing, spot UV coating, automatic die-cutting, structural folding, and packaging box gluing." }
    ],
    infographic: drawProcessTimelineInfographic
  },
  "Industries We Serve": {
    title: "INDUSTRIES WE SERVE",
    subtitle: "SECTOR-SPECIFIC PACKAGING ARCHITECTURES",
    accent: "#2563EB",
    details: [
      { heading: "Cosmetic & Perfume Luxury Brand", body: "Heavy setup rigid boxes, raised UV sleeves, gold foiled logos, and velvet drawer boxes designed for high-end beauty packaging." },
      { heading: "Food-Grade Takeaway Packaging", body: "FDA-certified barrier boards, grease-resistant takeaway boxes, and eco-friendly sleeves printed with food-safe organic inks." },
      { heading: "Pharmaceutical & Appliance Runs", body: "Rigid corrugated boxes, blister card backings, folding medicine cartons, and printed barcode labels with high structural safety parameters." }
    ],
    infographic: drawDielineInfographic
  },
  "Portfolio Catalogue": {
    title: "PORTFOLIO CATALOGUE",
    subtitle: "SELECTED PRODUCTION RUNS & CASE STUDIES",
    accent: "#E11D48",
    details: [
      { heading: "Case Study: Luxury Cosmetics Launch", body: "Manufactured 15,000 custom collapsible drawer rigid boxes featuring soft-touch lamination, metallic rose gold foiling, and velvet custom inserts." },
      { heading: "Case Study: Food Chain Carry Bag Line", body: "Produced 100,000 eco-friendly heavy Kraft paper takeaway shopping bags with reinforced handles, heat sealed bottoms, and organic ink prints." },
      { heading: "Case Study: Electronics E-Commerce Cartons", body: "Supplied 50,000 custom corrugated mailers with high edge-crush values, featuring spot varnished technical schematics and locking ears." }
    ],
    infographic: drawFinishesInfographic
  }
};

// Main PDF Generator & Downloader function
export const downloadBrochure = async (brochureName) => {
  const data = BROCHURES[brochureName];
  if (!data) {
    console.error(`Brochure "${brochureName}" not found in definitions.`);
    return;
  }

  // Create A4 PDF (Portrait: 210mm x 297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageW = 210;
  const pageH = 297;

  // ----------------------------------------------------
  // PAGE 1: COVER PAGE (Fortune 500 Luxury Editorial)
  // ----------------------------------------------------
  // Background: Dark zinc charcoal
  doc.setFillColor(18, 18, 21);
  doc.rect(0, 0, pageW, pageH, 'F');

  // Decorative luxury accent color block
  doc.setFillColor(37, 99, 235); // Dark blue accent
  doc.rect(10, 10, 3, 277, 'F');
  
  // Header Branding text
  doc.setTextColor(161, 161, 170); // Light gray
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('COLOURPIX PACKAGING & PRINTING', 25, 25);
  doc.text('ESTABLISHED 1991 | LCCI MEMBER ROSTER', 25, 30);

  // Horizontal thin line
  doc.setDrawColor(39, 39, 42); // Gray border
  doc.setLineWidth(0.5);
  doc.line(25, 35, 185, 35);

  // Large Editorial Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(36);
  
  // Split title if long
  const titleWords = data.title.split(' ');
  if (titleWords.length > 1) {
    doc.text(titleWords[0], 25, 75);
    doc.setTextColor(37, 99, 235); // Highlight second word
    doc.text(titleWords.slice(1).join(' '), 25, 90);
  } else {
    doc.text(data.title, 25, 75);
  }

  // Subtitle
  doc.setTextColor(161, 161, 170);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(data.subtitle, 25, 105);

  // Decorative golden geometry block
  doc.setDrawColor(234, 179, 8); // Gold borders
  doc.setLineWidth(0.8);
  doc.line(25, 115, 65, 115);

  // Manufacturing Stamp
  doc.setFillColor(24, 24, 27);
  doc.rect(25, 135, 155, 45, 'F');
  doc.setDrawColor(63, 63, 70);
  doc.rect(25, 135, 155, 45, 'D');

  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('MANUFACTURING COMPLIANCE STATEMENT:', 32, 147);
  doc.setTextColor(161, 161, 170);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  
  const complianceText = "This technical document details the proprietary folding dielines, substrate parameters, and machinery workloads executed at our Lahore industrial plant. All specifications adhere to AQL 1.0 zero-defect standards.";
  const lines = doc.splitTextToSize(complianceText, 140);
  doc.text(lines, 32, 155);

  // Footer cover
  doc.setTextColor(113, 113, 122);
  doc.setFontSize(8);
  doc.text('SECURE PACKAGING DIVISION', 25, 270);
  doc.text('PAGE 1 OF 3', 165, 270);

  // ----------------------------------------------------
  // PAGE 2: INSIDE CONTENT (Clean layout with Infographics)
  // ----------------------------------------------------
  doc.addPage();

  // Background: Light gray clean design
  doc.setFillColor(244, 244, 245);
  doc.rect(0, 0, pageW, pageH, 'F');

  // Decorative border
  doc.setDrawColor(212, 212, 216);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 277, 'D');

  // Inside Page Header
  doc.setTextColor(113, 113, 122);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('TECHNICAL DOSSIER // COLOURPIX PK', 18, 20);
  
  doc.setFont('Helvetica', 'normal');
  doc.text('PRODUCTION RUN SPECIFICATION', 142, 20);

  doc.setDrawColor(212, 212, 216);
  doc.line(18, 24, 192, 24);

  // Left column: Technical Details (Lines 30 - 180)
  let cursorY = 40;
  data.details.forEach((det, idx) => {
    doc.setTextColor(30, 41, 59);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`${idx + 1}. ${det.heading}`, 18, cursorY);
    
    doc.setTextColor(71, 85, 105);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    
    const bodyLines = doc.splitTextToSize(det.body, 174);
    doc.text(bodyLines, 18, cursorY + 6);
    
    cursorY += 10 + (bodyLines.length * 4.5);
  });

  // Center column: Custom Vector Infographic
  if (data.infographic) {
    // Background card for infographic
    doc.setFillColor(255, 255, 255);
    doc.rect(18, cursorY + 5, 174, 52, 'F');
    doc.setDrawColor(228, 228, 231);
    doc.rect(18, cursorY + 5, 174, 52, 'D');
    
    data.infographic(doc, 25, cursorY + 20);
  }

  // Inside Footer
  doc.setTextColor(113, 113, 122);
  doc.setFontSize(8);
  doc.text('COLOURPIX PRIVATE INDUSTRIAL AUDIT 2026', 18, 275);
  doc.text('PAGE 2 OF 3', 170, 275);

  // ----------------------------------------------------
  // PAGE 3: CONTACT PAGE & Dynamic QR Code
  // ----------------------------------------------------
  doc.addPage();

  // Background: Dark zinc charcoal
  doc.setFillColor(18, 18, 21);
  doc.rect(0, 0, pageW, pageH, 'F');

  // Decorative border
  doc.setDrawColor(39, 39, 42);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 277, 'D');

  // Header
  doc.setTextColor(161, 161, 170);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('COLOURPIX INDUSTRIAL FACILITY // INQUIRIES', 18, 22);
  doc.line(18, 26, 192, 26);

  // Large Contact Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('GET IN TOUCH FOR CUSTOM RUNS', 18, 45);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(161, 161, 170);
  doc.text('Our estimators and structural pre-press engineers respond to inquiries within 12 hours.', 18, 52);

  // Contact list
  const contactInfo = [
    { label: "HEAD OFFICE", val: "ColourPix Building, Link Road, Lahore, Pakistan" },
    { label: "REGIONAL OFFICES", val: "Karachi Port Shipping Hub | Islamabad Corporate Office" },
    { label: "BULK ORDER EMAIL", val: "inquiry@colourpix.pk | sales@colourpix.pk" },
    { label: "PHONE / WHATSAPP", val: "+92 321 441 5566 | +92 42 3588 1991" },
    { label: "LCCI ACCREDITATION", val: "Registered Active Member #1991-PK" }
  ];

  let contactY = 70;
  contactInfo.forEach(info => {
    doc.setTextColor(37, 99, 235); // Blue
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(info.label, 18, contactY);

    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(info.val, 18, contactY + 5);

    contactY += 15;
  });

  // Dynamically load scannable QR Code using QR Server API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://colourpix.pk`;
  const qrBase64 = await getBase64FromUrl(qrUrl);
  
  if (qrBase64) {
    // Background card for QR code
    doc.setFillColor(24, 24, 27);
    doc.rect(18, contactY + 5, 174, 52, 'F');
    doc.setDrawColor(63, 63, 70);
    doc.rect(18, contactY + 5, 174, 52, 'D');

    // Add QR code image
    doc.addImage(qrBase64, 'PNG', 28, contactY + 11, 40, 40);

    // QR Description
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('SCAN QR CODE TO ACCESS LIVE PLATFORM', 78, contactY + 22);

    doc.setTextColor(161, 161, 170);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Scan with your smartphone camera to upload design dielines,', 78, contactY + 28);
    doc.text('track your packaging order pipeline, or request direct print proofs.', 78, contactY + 33);
  }

  // Footer Page 3
  doc.setTextColor(113, 113, 122);
  doc.setFontSize(8);
  doc.text('COLOURPIX COMPLIANCE OFFICIAL ARCHIVE 2026', 18, 275);
  doc.text('PAGE 3 OF 3', 170, 275);

  // Save the PDF
  const sanitizedName = brochureName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  doc.save(`colourpix_${sanitizedName}_brochure.pdf`);
};
