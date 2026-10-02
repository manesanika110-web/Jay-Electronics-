import fs from 'fs';
import * as babel from '@babel/parser';

const code = fs.readFileSync('./src/pages/AdminDashboard.jsx', 'utf8');

try {
  babel.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log('Babel JSX parse SUCCESSFUL! No syntax error found.');
} catch (err) {
  console.error('Babel JSX parse ERROR:', err.message, 'at line', err.loc ? err.loc.line : 'unknown');
}
