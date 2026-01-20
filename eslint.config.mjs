import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable strict TypeScript rules for frontend-only build
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      
      // Disable React rules that are too strict for extracted code
      "react/no-unescaped-entities": "warn",
      "react-hooks/exhaustive-deps": "warn",
      
      // Disable Next.js specific warnings for extracted frontend
      "@next/next/no-img-element": "warn",
      
      // Disable import rules
      "import/no-anonymous-default-export": "warn",
      
      // Allow prefer-const warnings
      "prefer-const": "warn"
    }
  }
];

export default eslintConfig;