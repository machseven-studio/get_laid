import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./hooks/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#09090B", panel: "#151518", accent: "#E9A66C" } } },
  plugins: []
};
export default config;
