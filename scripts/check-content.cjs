const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync('public/works.js', 'utf8'), context);
const works = context.window.ARTWORKS;
if (!Array.isArray(works) || works.length === 0) {
  console.error('Publishing paused: add Alex’s curated artwork to public/works.js first.');
  process.exit(1);
}
for (const work of works) {
  const file = path.resolve('public', work.file || '');
  if (!work.title || !file.startsWith(path.resolve('public') + path.sep) || !fs.existsSync(file)) {
    console.error('Every artwork needs a title and an existing image inside public/.');
    process.exit(1);
  }
}
console.log(`Ready to publish ${works.length} curated works.`);
