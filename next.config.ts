import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // EXPERIMENTAL VIEW TRANSITIONS DISABLED FOR DEPLOYMENT TESTING
  // experimental: {
  //   // Enable view transitions for smooth page transitions
  //   viewTransition: true,
  // },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
// Only initialize during development to avoid instrumentation hook errors in production
if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev();
  });
}
