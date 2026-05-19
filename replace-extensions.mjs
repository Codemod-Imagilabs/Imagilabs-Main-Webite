import fs from 'fs/promises';
import path from 'path';

const searchPath = 'src';

async function replaceExtensions(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await replaceExtensions(fullPath);
    } else if (['.jsx', '.js', '.css', '.html'].includes(path.extname(file.name))) {
      let content = await fs.readFile(fullPath, 'utf8');
      if (content.match(/\.(png|jpeg|jpg)/i)) {
        content = content.replace(/\.(png|jpeg|jpg)/gi, '.webp');
        await fs.writeFile(fullPath, content, 'utf8');
        console.log(`Updated imports in ${fullPath}`);
      }
    }
  }
}

replaceExtensions(searchPath).then(() => console.log('Replacements done.'));
