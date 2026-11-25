import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true }, // per gli import con "@/..."
  test: {
    setupFiles: ["./vitest.setup.ts"],
  },
});
