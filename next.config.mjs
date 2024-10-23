import path from 'path';
import { NextFederationPlugin } from '@module-federation/nextjs-mf';


const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"], // Specify packages to transpile
  output: "standalone", // Use standalone output for deployment
  experimental: {
    outputFileTracingRoot: path.join(process.cwd(), "../../"), // Adjust as necessary for your monorepo structure
  },
  webpack(config, { }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'blog', // Name of the blog app
        filename: 'static/chunks/remoteEntry.js', // The entry point for the remote module
        exposes: {
          './BlogHome': './pages/index.tsx', // Expose the blog's main page (index.js)
        },
        shared: {
          react: { singleton: true, eager: true, requiredVersion: false },
          'react-dom': { singleton: true, eager: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
};

export default nextConfig; // Use 'export default' for ES modules
