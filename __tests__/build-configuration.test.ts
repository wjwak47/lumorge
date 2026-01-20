// Property Test 6: Build Configuration Integrity
// Validates that the build configuration is properly set up for standalone frontend

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

describe('Property Test 6: Build Configuration Integrity', () => {
  const projectRoot = process.cwd();

  // Property 6.1: Package.json has correct frontend dependencies
  test('Property 6.1: Package.json contains only frontend dependencies', () => {
    const packageJsonPath = path.join(projectRoot, 'package.json');
    expect(fs.existsSync(packageJsonPath)).toBe(true);
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Should have frontend dependencies
    const expectedFrontendDeps = [
      'next',
      'react',
      'react-dom',
      'tailwind-merge',
      'clsx',
      'lucide-react'
    ];
    
    expectedFrontendDeps.forEach(dep => {
      expect(packageJson.dependencies).toHaveProperty(dep);
    });
    
    // Should NOT have backend dependencies
    const backendDeps = [
      'mysql2',
      'express',
      'cors',
      'body-parser',
      'multer',
      'bcrypt',
      'jsonwebtoken'
    ];
    
    backendDeps.forEach(dep => {
      expect(packageJson.dependencies).not.toHaveProperty(dep);
    });
  });

  // Property 6.2: Build scripts are properly configured
  test('Property 6.2: Build scripts are configured for frontend-only build', () => {
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Should have essential scripts
    expect(packageJson.scripts).toHaveProperty('dev');
    expect(packageJson.scripts).toHaveProperty('build');
    expect(packageJson.scripts).toHaveProperty('start');
    expect(packageJson.scripts).toHaveProperty('lint');
    
    // Build script should use Next.js
    expect(packageJson.scripts.build).toBe('next build');
    
    // Should have test scripts
    expect(packageJson.scripts).toHaveProperty('test');
  });

  // Property 6.3: Next.js configuration supports static export
  test('Property 6.3: Next.js configuration is set up for standalone frontend', () => {
    const nextConfigPath = path.join(projectRoot, 'next.config.js');
    expect(fs.existsSync(nextConfigPath)).toBe(true);
    
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    // Should have static export configuration
    expect(nextConfigContent).toContain('output: \'export\'');
    expect(nextConfigContent).toContain('trailingSlash: true');
    
    // Should have image configuration for external sources
    expect(nextConfigContent).toContain('remotePatterns');
    expect(nextConfigContent).toContain('images.unsplash.com');
  });

  // Property 6.4: Styling configurations are present and valid
  test('Property 6.4: Styling configurations are properly set up', () => {
    // Tailwind config
    const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js');
    expect(fs.existsSync(tailwindConfigPath)).toBe(true);
    
    const tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8');
    expect(tailwindConfig).toContain('./src/**/*.{js,ts,jsx,tsx}');
    expect(tailwindConfig).toContain('extend');
    
    // PostCSS config
    const postcssConfigPath = path.join(projectRoot, 'postcss.config.js');
    expect(fs.existsSync(postcssConfigPath)).toBe(true);
    
    const postcssConfig = fs.readFileSync(postcssConfigPath, 'utf8');
    expect(postcssConfig).toContain('tailwindcss');
    expect(postcssConfig).toContain('autoprefixer');
  });

  // Property 6.5: TypeScript configuration is valid
  test('Property 6.5: TypeScript configuration supports Next.js and frontend development', () => {
    const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
    expect(fs.existsSync(tsconfigPath)).toBe(true);
    
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    
    // Should have proper compiler options
    expect(tsconfig.compilerOptions).toHaveProperty('jsx', 'preserve');
    expect(tsconfig.compilerOptions).toHaveProperty('moduleResolution', 'bundler');
    expect(tsconfig.compilerOptions).toHaveProperty('strict', true);
    
    // Should have path mapping for @/*
    expect(tsconfig.compilerOptions.paths).toHaveProperty('@/*');
    expect(tsconfig.compilerOptions.paths['@/*']).toContain('src/*');
    
    // Should include Next.js plugin
    expect(tsconfig.compilerOptions.plugins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'next' })
      ])
    );
  });

  // Property 6.6: ESLint configuration allows frontend-only warnings
  test('Property 6.6: ESLint configuration is set up for frontend development', () => {
    const eslintConfigPath = path.join(projectRoot, 'eslint.config.mjs');
    expect(fs.existsSync(eslintConfigPath)).toBe(true);
    
    const eslintConfig = fs.readFileSync(eslintConfigPath, 'utf8');
    
    // Should extend Next.js configs
    expect(eslintConfig).toContain('next/core-web-vitals');
    expect(eslintConfig).toContain('next/typescript');
    
    // Should have custom rules for warnings instead of errors
    expect(eslintConfig).toContain('@typescript-eslint/no-explicit-any');
    expect(eslintConfig).toContain('warn');
  });

  // Property 6.7: Jest configuration is properly set up
  test('Property 6.7: Jest configuration supports testing', () => {
    const jestConfigPath = path.join(projectRoot, 'jest.config.js');
    expect(fs.existsSync(jestConfigPath)).toBe(true);
    
    const jestConfig = fs.readFileSync(jestConfigPath, 'utf8');
    
    // Should use Next.js Jest configuration
    expect(jestConfig).toContain('next/jest');
    expect(jestConfig).toContain('jest-environment-jsdom');
    
    // Should have module name mapping
    expect(jestConfig).toContain('moduleNameMapper');
    expect(jestConfig).toContain('@/(.*)');
  });

  // Property 6.8: Configuration files consistency
  test('Property 6.8: All configuration files are consistent and valid JSON/JS', async () => {
    await fc.assert(fc.asyncProperty(
      fc.constantFrom(
        'package.json',
        'tsconfig.json',
        'next.config.js',
        'tailwind.config.js',
        'postcss.config.js',
        'jest.config.js',
        'eslint.config.mjs'
      ),
      async (configFile) => {
        const configPath = path.join(projectRoot, configFile);
        expect(fs.existsSync(configPath)).toBe(true);
        
        const stats = fs.statSync(configPath);
        expect(stats.isFile()).toBe(true);
        expect(stats.size).toBeGreaterThan(0);
        
        // For JSON files, validate JSON syntax
        if (configFile.endsWith('.json')) {
          const content = fs.readFileSync(configPath, 'utf8');
          expect(() => JSON.parse(content)).not.toThrow();
        }
        
        return true;
      }
    ), { numRuns: 10 });
  });

  // Property 6.9: Environment file template exists
  test('Property 6.9: Environment configuration is documented', () => {
    // Check if there's documentation about environment variables
    const files = fs.readdirSync(projectRoot);
    const hasEnvDocumentation = files.some(file => 
      file.includes('env') || 
      file.includes('README') ||
      file.includes('SETUP')
    );
    
    expect(hasEnvDocumentation).toBe(true);
  });
});

// Integration test for build configuration
describe('Build Configuration Integration', () => {
  test('All configuration files work together', () => {
    const projectRoot = process.cwd();
    
    // Essential configuration files should exist
    const essentialConfigs = [
      'package.json',
      'next.config.js',
      'tailwind.config.js',
      'tsconfig.json'
    ];
    
    essentialConfigs.forEach(config => {
      const configPath = path.join(projectRoot, config);
      expect(fs.existsSync(configPath)).toBe(true);
    });
  });

  test('Package.json scripts reference existing configurations', () => {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Build script should work with next.config.js
    expect(packageJson.scripts.build).toContain('next');
    
    // Lint script should work with eslint config
    expect(packageJson.scripts.lint).toContain('next lint');
    
    // Test script should work with jest config
    expect(packageJson.scripts.test).toContain('jest');
  });
});