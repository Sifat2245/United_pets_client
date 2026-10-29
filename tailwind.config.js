import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F97316",   
        secondary: "#018AE0",
      },
    },
  },
  plugins: [],
};
