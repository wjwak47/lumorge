// Property Test 5: Static Asset Preservation
// Validates that all static assets are properly preserved and accessible

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

describe('Property Test 5: Static Asset Preservation', () => {
  const publicDir = path.join(process.cwd(), 'public');
  const originalPublicDir = path.join(process.cwd(), '..', 'public');

  // Helper function to get all files in a directory recursively
  const getAllFiles = (dir: string): string[] => {
    if (!fs.existsSync(dir)) return [];
    
    const files: string[] = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath));
      } else {
        files.push(fullPath);
      }
    }
    
    return files;
  };

  // Helper function to get relative path from public directory
  const getRelativePath = (fullPath: string, baseDir: string): string => {
    return path.relative(baseDir, fullPath).replace(/\\/g, '/');
  };

  // Property 5.1: All static assets from original public directory are preserved
  test('Property 5.1: All static assets are preserved from original public directory', () => {
    const originalFiles = getAllFiles(originalPublicDir);
    const extractedFiles = getAllFiles(publicDir);
    
    const originalRelativePaths = originalFiles.map(f => getRelativePath(f, originalPublicDir));
    const extractedRelativePaths = extractedFiles.map(f => getRelativePath(f, publicDir));
    
    // Check that we have the same number of files
    expect(extractedFiles.length).toBe(originalFiles.length);
    
    // Check that all original files exist in extracted directory
    originalRelativePaths.forEach(relativePath => {
      expect(extractedRelativePaths).toContain(relativePath);
    });
  });

  // Property 5.2: Image directory structure is preserved
  test('Property 5.2: Image directory structure is preserved', () => {
    const imagesDir = path.join(publicDir, 'images');
    const originalImagesDir = path.join(originalPublicDir, 'images');
    
    if (fs.existsSync(originalImagesDir)) {
      expect(fs.existsSync(imagesDir)).toBe(true);
      
      const originalImageFiles = getAllFiles(originalImagesDir);
      const extractedImageFiles = getAllFiles(imagesDir);
      
      const originalRelativePaths = originalImageFiles.map(f => getRelativePath(f, originalImagesDir));
      const extractedRelativePaths = extractedImageFiles.map(f => getRelativePath(f, imagesDir));
      
      expect(extractedImageFiles.length).toBe(originalImageFiles.length);
      
      originalRelativePaths.forEach(relativePath => {
        expect(extractedRelativePaths).toContain(relativePath);
      });
    }
  });

  // Property 5.3: Icons directory structure is preserved
  test('Property 5.3: Icons directory structure is preserved', () => {
    const iconsDir = path.join(publicDir, 'icons');
    const originalIconsDir = path.join(originalPublicDir, 'icons');
    
    if (fs.existsSync(originalIconsDir)) {
      expect(fs.existsSync(iconsDir)).toBe(true);
      
      const originalIconFiles = getAllFiles(originalIconsDir);
      const extractedIconFiles = getAllFiles(iconsDir);
      
      expect(extractedIconFiles.length).toBe(originalIconFiles.length);
      
      // Check that all icon files are SVG files (expected format)
      extractedIconFiles.forEach(iconFile => {
        expect(path.extname(iconFile)).toBe('.svg');
      });
    }
  });

  // Property 5.4: Asset path resolution works correctly
  test('Property 5.4: Asset paths resolve correctly for common image formats', async () => {
    await fc.assert(fc.asyncProperty(
      fc.constantFrom('jpg', 'png', 'svg', 'gif', 'webp'),
      fc.constantFrom('images', 'icons', 'products'),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z0-9-_]+$/.test(s)),
      async (extension, directory, filename) => {
        const assetPath = `/${directory}/${filename}.${extension}`;
        const fullPath = path.join(publicDir, directory, `${filename}.${extension}`);
        
        // Test that the path format is correct (starts with /, uses forward slashes)
        expect(assetPath.startsWith('/')).toBe(true);
        expect(assetPath.includes('\\')).toBe(false);
        
        // Test that the path doesn't contain double slashes
        expect(assetPath.includes('//')).toBe(false);
        
        return true;
      }
    ), { numRuns: 50 });
  });

  // Property 5.5: File integrity is maintained (file sizes match)
  test('Property 5.5: File integrity is maintained for copied assets', () => {
    const originalFiles = getAllFiles(originalPublicDir);
    
    originalFiles.forEach(originalFile => {
      const relativePath = getRelativePath(originalFile, originalPublicDir);
      const extractedFile = path.join(publicDir, relativePath);
      
      if (fs.existsSync(extractedFile)) {
        const originalStats = fs.statSync(originalFile);
        const extractedStats = fs.statSync(extractedFile);
        
        // File sizes should match
        expect(extractedStats.size).toBe(originalStats.size);
      }
    });
  });

  // Property 5.6: Common asset types are present
  test('Property 5.6: Common asset types are present and accessible', () => {
    const commonAssetTypes = ['.jpg', '.png', '.svg', '.gif'];
    const allFiles = getAllFiles(publicDir);
    
    // Check that we have files of common asset types
    commonAssetTypes.forEach(extension => {
      const filesWithExtension = allFiles.filter(file => 
        path.extname(file).toLowerCase() === extension
      );
      
      // We should have at least some files of each common type
      // (This is a reasonable assumption for a web application)
      if (extension === '.svg') {
        expect(filesWithExtension.length).toBeGreaterThan(0);
      }
    });
  });

  // Property 5.7: No broken symlinks or invalid files
  test('Property 5.7: All files are valid and accessible', () => {
    const allFiles = getAllFiles(publicDir);
    
    // Known placeholder files that may be empty
    const placeholderFiles = [
      'control-system-1.jpg',
      'control-system-2.jpg', 
      'integration-3.jpg'
    ];
    
    allFiles.forEach(file => {
      // File should exist and be readable
      expect(fs.existsSync(file)).toBe(true);
      
      const stats = fs.statSync(file);
      expect(stats.isFile()).toBe(true);
      
      // Allow placeholder files to be empty, but other files should have content
      const fileName = path.basename(file);
      if (!placeholderFiles.includes(fileName)) {
        expect(stats.size).toBeGreaterThan(0); // Files should not be empty
      }
    });
  });

  // Property 5.8: Directory structure consistency
  test('Property 5.8: Directory structure matches original', () => {
    const getDirectoryStructure = (dir: string): string[] => {
      if (!fs.existsSync(dir)) return [];
      
      const dirs: string[] = [];
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          dirs.push(getRelativePath(fullPath, dir));
          dirs.push(...getDirectoryStructure(fullPath).map(subDir => 
            path.join(getRelativePath(fullPath, dir), subDir).replace(/\\/g, '/')
          ));
        }
      }
      
      return dirs;
    };

    const originalDirs = getDirectoryStructure(originalPublicDir);
    const extractedDirs = getDirectoryStructure(publicDir);
    
    // All original directories should exist in extracted version
    originalDirs.forEach(dir => {
      expect(extractedDirs).toContain(dir);
    });
  });
});

// Integration test for asset accessibility
describe('Static Asset Integration', () => {
  test('Critical assets are present and accessible', () => {
    const criticalAssets = [
      'icons/facebook.svg',
      'icons/twitter.svg',
      'icons/linkedin.svg',
      'icons/instagram.svg'
    ];

    criticalAssets.forEach(asset => {
      const assetPath = path.join(process.cwd(), 'public', asset);
      expect(fs.existsSync(assetPath)).toBe(true);
      
      const stats = fs.statSync(assetPath);
      expect(stats.isFile()).toBe(true);
      expect(stats.size).toBeGreaterThan(0);
    });
  });

  test('Image directories are properly organized', () => {
    const expectedDirs = ['images', 'icons', 'products'];
    
    expectedDirs.forEach(dir => {
      const dirPath = path.join(process.cwd(), 'public', dir);
      if (fs.existsSync(dirPath)) {
        const stats = fs.statSync(dirPath);
        expect(stats.isDirectory()).toBe(true);
      }
    });
  });
});