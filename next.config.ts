import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
// Only initialize in development mode to avoid build-time errors
// Wrapped in try-catch to prevent test failures
if (process.env.NODE_ENV === "development" && !process.env.PLAYWRIGHT_TEST) {
  try {
    import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
      initOpenNextCloudflareForDev();
    }).catch((error) => {
      console.error("Error initializing OpenNext Cloudflare for dev:", error);
    });
  } catch (error) {
    console.error("Error initializing OpenNext Cloudflare for dev:", error);
  }
}
