import * as fs from 'fs';
import * as path from 'path';
import fc from 'fast-check';

describe('Frontend Extraction Properties', () => {
  // Feature: frontend-extraction, Property 1: Complete Frontend Extraction
  test('Property 1: Complete Frontend Extraction', () => {
    fc.assert(fc.property(
      fc.constantFrom(
        'src/components',
        'src/app', 
        'src/utils',
        'src/hooks',
        'src/contexts',
        'src/data',
        'src/lib'
      ),
      (directory) => {
        const originalPath = path.join(process.cwd(), '..', directory);
        const extractedPath = path.join(process.cwd(), directory);
        
        // Check if original directory exists
        if (!fs.existsSync(originalPath)) {
          return true; // Skip if original doesn't exist
        }
        
        // Check if extracted directory exists
        expect(fs.existsSync(extractedPath)).toBe(true);
        
        // Get all files in original directory
        const getFiles = (dir: string): string[] => {
          if (!fs.existsSync(dir)) return [];
          
          const files: string[] = [];
          const items = fs.readdirSync(dir);
          
          for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
              files.push(...getFiles(fullPath));
            } else {
              files.push(fullPath);
            }
          }
          
          return files;
        };
        
        const originalFiles = getFiles(originalPath);
        const extractedFiles = getFiles(extractedPath);
        
        // Convert to relative paths for comparison
        const originalRelative = originalFiles.map(f => path.relative(originalPath, f));
        const extractedRelative = extractedFiles.map(f => path.relative(extractedPath, f));
        
        // Check that all original files exist in extracted
        for (const file of originalRelative) {
          expect(extractedRelative).toContain(file);
        }
        
        return true;
      }
    ), { numRuns: 10 });
  });
  
  test('Verify component files are copied correctly', () => {
    const componentDirs = [
      'src/components/features',
      'src/components/layout', 
      'src/components/ui'
    ];
    
    componentDirs.forEach(dir => {
      const extractedDir = path.join(process.cwd(), dir);
      expect(fs.existsSync(extractedDir)).toBe(true);
    });
    
    // Check specific important files
    const importantFiles = [
      'src/components/layout/Header.tsx',
      'src/components/layout/Footer.tsx',
      'src/components/features/Hero.tsx',
      'src/app/layout.tsx',
      'src/app/page.tsx'
    ];
    
    importantFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });
  
  test('Verify directory structure is maintained', () => {
    const expectedStructure = [
      'src',
      'src/components',
      'src/components/features',
      'src/components/layout',
      'src/components/ui',
      'src/app',
      'src/utils',
      'src/hooks',
      'src/contexts',
      'src/data',
      'src/lib',
      'public',
      'public/images',
      'public/icons'
    ];
    
    expectedStructure.forEach(dir => {
      const dirPath = path.join(process.cwd(), dir);
      expect(fs.existsSync(dirPath)).toBe(true);
    });
  });
});