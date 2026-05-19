import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeDirectory(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        await optimizeDirectory(fullPath);
      } else {
        const ext = path.extname(file.name).toLowerCase();
        
        // Target heavy images
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
          console.log(`Optimizing: ${fullPath}`);
          
          const webpPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.webp';
          
          try {
            await sharp(fullPath)
              .webp({ quality: 80, effort: 6 }) // Convert to webp with high compression
              .toFile(webpPath);
              
            // Get sizes to compare
            const oldStat = await fs.stat(fullPath);
            const newStat = await fs.stat(webpPath);
            
            console.log(`Converted ${file.name} to WebP. Saved ${(oldStat.size - newStat.size) / 1024 | 0}KB.`);
            
            // Delete original file
            await fs.unlink(fullPath);
          } catch (e) {
            console.error(`Error processing ${file.name}:`, e.message);
          }
        }
      }
    }
  } catch (err) {
    console.error(`Failed to read directory ${dir}:`, err.message);
  }
}

const assetsDir = path.join(__dirname, 'src', 'assets');
console.log('Starting image optimization...');
await optimizeDirectory(assetsDir);
console.log('Done!');
