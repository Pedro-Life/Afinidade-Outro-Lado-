import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const app = await readFile(new URL('../app.js', import.meta.url), 'utf8');
const packageInfo = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
test('versão estável 1.0.0 e descrição da Sombra conforme especificação', () => {
  assert.equal(packageInfo.version, '1.0.0');
  assert.ok(app.includes('suas quatro afinidades e sua sombra.'));
  assert.ok(!app.includes('uma provocação sobre sua sombra'));
  assert.ok(app.includes('<span>99%</span>'));
});
