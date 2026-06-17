import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standalone Joushen app — kept out of the Open Design pnpm workspace on purpose.
export default defineConfig({
  plugins: [react()],
  server: { port: 4310 },
});
