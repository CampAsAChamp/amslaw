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
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
