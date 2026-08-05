const http = require('http');

function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/`, (res) => {
      resolve({ port, status: res.statusCode, active: true });
    });
    req.on('error', (err) => {
      resolve({ port, active: false, error: err.message });
    });
    req.setTimeout(1000, () => {
      req.destroy();
      resolve({ port, active: false, error: 'timeout' });
    });
  });
}

async function run() {
  const p3000 = await checkPort(3000);
  const p3001 = await checkPort(3001);
  console.log("Port 3000 check:", p3000);
  console.log("Port 3001 check:", p3001);
}

run();
