import * as fs from 'fs';
import * as path from 'path';
import fc from 'fast-check';

describe('Backend Dependency Removal Properties', () => {
  // Feature: frontend-extraction, Property 2: Backend Dependency Exclusion
  test('Property 2: Backend Dependency Exclusion', () => {
    fc.assert(fc.property(
      fc.constantFrom(
        'techsports-admin',
        'server',
        'backend',
        'api',
        'database'
      ),
      (backendDir) => {
        const backendPath = path.join(process.cwd(), backendDir);
        
        // Backend directories should not exist in extracted frontend
        expect(fs.existsSync(backendPath)).toBe(false);
        
        return true;
      }
    ), { numRuns: 5 });
  });
  
  test('Verify no backend dependencies in package.json', () => {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    expect(fs.existsSync(packageJsonPath)).toBe(true);
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Backend dependencies that should not exist
    const backendDeps = [
      'mysql2',
      'express', 
      'cors',
      'helmet',
      'morgan',
      'dotenv',
      'path-to-regexp',
      'axios' // Removed since we're using mock data
    ];
    
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };
    
    backendDeps.forEach(dep => {
      expect(allDeps).not.toHaveProperty(dep);
    });
  });
  
  test('Verify no backend-related files exist', () => {
    const backendFiles = [
      'src/utils/request.js',
      'config.js',
      'server.js',
      'app.js'
    ];
    
    backendFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      expect(fs.existsSync(filePath)).toBe(false);
    });
  });
  
  test('Verify no API routes exist', () => {
    const apiRoutePath = path.join(process.cwd(), 'src/app/api');
    expect(fs.existsSync(apiRoutePath)).toBe(false);
  });
  
  test('Scan for backend imports in source files', () => {
    const scanDirectory = (dir: string): string[] => {
      if (!fs.existsSync(dir)) return [];
      
      const files: string[] = [];
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          files.push(...scanDirectory(fullPath));
        } else if (item.match(/\.(ts|tsx|js|jsx)$/)) {
          files.push(fullPath);
        }
      }
      
      return files;
    };
    
    const sourceFiles = scanDirectory(path.join(process.cwd(), 'src'));
    
    const backendImportPatterns = [
      /import.*mysql/,
      /import.*express/,
      /import.*cors/,
      /import.*helmet/,
      /import.*morgan/,
      /require.*mysql/,
      /require.*express/
    ];
    
    sourceFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      
      backendImportPatterns.forEach(pattern => {
        expect(content).not.toMatch(pattern);
      });
    });
  });
});