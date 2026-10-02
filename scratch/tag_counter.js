import fs from 'fs';

const code = fs.readFileSync('./src/pages/AdminDashboard.jsx', 'utf8');
const lines = code.split('\n');
let openDivs = 0;

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  const opens = (line.match(/<div[\s>]/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  openDivs += opens - closes;
  if (lineNum >= 1220 && lineNum <= 1245) {
    console.log(`L${lineNum} [opens=${opens}, closes=${closes}, depth=${openDivs}]: ${line.trim()}`);
  }
});
