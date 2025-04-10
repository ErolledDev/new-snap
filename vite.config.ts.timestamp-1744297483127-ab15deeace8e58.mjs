// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import path from "path";
import compression from "file:///home/project/node_modules/vite-plugin-compression/dist/index.mjs";
import { ViteImageOptimizer } from "file:///home/project/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
var copyStaticFiles = () => {
  const files = [
    "robots.txt",
    "sitemap.xml",
    "manifest.json",
    "icon-192x192.png",
    "icon-512x512.png",
    "og-image.jpeg",
    "twitter-image.jpeg",
    "desktop-view.jpg",
    "mobile-view.jpg",
    "vite.svg"
  ];
  files.forEach((file) => {
    const sourcePath = path.join("public", file);
    const targetPath = path.join("dist", file);
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
    } else {
      console.warn(`Warning: ${file} not found in public directory`);
    }
  });
};
var generateStaticFiles = () => {
  const routes = [
    "/features",
    "/about",
    "/privacy",
    "/terms",
    "/faq",
    "/404"
  ];
  routes.forEach((route) => {
    const dir = path.join("dist", route);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.copyFileSync("dist/index.html", path.join(dir, "index.html"));
  });
};
var generateSitemap = () => {
  const baseUrl = "https://snapmails.xyz";
  const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const pages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/features", priority: "0.8", changefreq: "weekly" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
    { url: "/privacy", priority: "0.6", changefreq: "monthly" },
    { url: "/terms", priority: "0.6", changefreq: "monthly" },
    { url: "/faq", priority: "0.7", changefreq: "weekly" }
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
  fs.writeFileSync("dist/sitemap.xml", sitemap);
};
var generateRobotsTxt = () => {
  const robotsTxt = `# robots.txt for SnapMails
User-agent: *
Allow: /
Allow: /features
Allow: /about
Allow: /privacy
Allow: /terms
Allow: /faq

# Block access to API endpoints and sensitive directories
Disallow: /api/
Disallow: /.git/
Disallow: /node_modules/
Disallow: /.env
Disallow: /.env.*

# Crawl delay to prevent server overload
Crawl-delay: 10

# Sitemap location
Sitemap: https://snapmails.xyz/sitemap.xml

# Additional rules for specific bots
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

# Block archive.org bot
User-agent: ia_archiver
Disallow: /

# Block potentially harmful bots
User-agent: Baiduspider
Disallow: /

User-agent: PetalBot
Disallow: /`;
  fs.writeFileSync("dist/robots.txt", robotsTxt);
};
var vite_config_default = defineConfig({
  plugins: [
    react({
      babel: {
        presets: ["@babel/preset-react"],
        plugins: []
      }
    }),
    compression({ algorithm: "brotli", ext: ".br" }),
    compression({ algorithm: "gzip", ext: ".gz" }),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
        progressive: true
      },
      png: {
        quality: 80,
        progressive: true
      },
      webp: {
        lossless: true
      }
    }),
    {
      name: "generate-static-files",
      closeBundle() {
        copyStaticFiles();
        generateStaticFiles();
        generateSitemap();
        generateRobotsTxt();
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          icons: ["lucide-react"],
          utils: ["./src/lib/guerrilla.ts", "./src/lib/words.ts"],
          features: ["./src/pages/Features.tsx"],
          about: ["./src/pages/About.tsx"],
          privacy: ["./src/pages/Privacy.tsx"],
          terms: ["./src/pages/Terms.tsx"],
          faq: ["./src/pages/FAQ.tsx"]
        }
      }
    },
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1e3,
    assetsInlineLimit: 4096,
    sourcemap: false,
    cssCodeSplit: true,
    modulePreload: {
      polyfill: true
    },
    cache: true,
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "lucide-react", "react-helmet-async", "react-hot-toast"],
      exclude: []
    }
  },
  server: {
    hmr: {
      protocol: "ws",
      host: "localhost",
      clientPort: 5173,
      overlay: false
    },
    headers: {
      "Cache-Control": "public, max-age=31536000",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      "Content-Security-Policy": "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self' data:; connect-src 'self' https:;"
    },
    compression: true,
    watch: {
      usePolling: true,
      interval: 1e3
    }
  },
  preview: {
    headers: {
      "Cache-Control": "public, max-age=31536000",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      "Content-Security-Policy": "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self' data:; connect-src 'self' https:;"
    },
    compression: true
  },
  esbuild: {
    legalComments: "none",
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    drop: ["console", "debugger"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xuaW1wb3J0IHsgVml0ZUltYWdlT3B0aW1pemVyIH0gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2Utb3B0aW1pemVyJztcblxuLy8gQ29weSBzdGF0aWMgZmlsZXMgdG8gZGlzdFxuY29uc3QgY29weVN0YXRpY0ZpbGVzID0gKCkgPT4ge1xuICBjb25zdCBmaWxlcyA9IFtcbiAgICAncm9ib3RzLnR4dCcsXG4gICAgJ3NpdGVtYXAueG1sJyxcbiAgICAnbWFuaWZlc3QuanNvbicsXG4gICAgJ2ljb24tMTkyeDE5Mi5wbmcnLFxuICAgICdpY29uLTUxMng1MTIucG5nJyxcbiAgICAnb2ctaW1hZ2UuanBlZycsXG4gICAgJ3R3aXR0ZXItaW1hZ2UuanBlZycsXG4gICAgJ2Rlc2t0b3Atdmlldy5qcGcnLFxuICAgICdtb2JpbGUtdmlldy5qcGcnLFxuICAgICd2aXRlLnN2ZydcbiAgXTtcblxuICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgIGNvbnN0IHNvdXJjZVBhdGggPSBwYXRoLmpvaW4oJ3B1YmxpYycsIGZpbGUpO1xuICAgIGNvbnN0IHRhcmdldFBhdGggPSBwYXRoLmpvaW4oJ2Rpc3QnLCBmaWxlKTtcbiAgICBcbiAgICBpZiAoZnMuZXhpc3RzU3luYyhzb3VyY2VQYXRoKSkge1xuICAgICAgZnMuY29weUZpbGVTeW5jKHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oYFdhcm5pbmc6ICR7ZmlsZX0gbm90IGZvdW5kIGluIHB1YmxpYyBkaXJlY3RvcnlgKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gR2VuZXJhdGUgc3RhdGljIEhUTUwgZmlsZXMgZm9yIGVhY2ggcm91dGVcbmNvbnN0IGdlbmVyYXRlU3RhdGljRmlsZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHJvdXRlcyA9IFtcbiAgICAnL2ZlYXR1cmVzJyxcbiAgICAnL2Fib3V0JyxcbiAgICAnL3ByaXZhY3knLFxuICAgICcvdGVybXMnLFxuICAgICcvZmFxJyxcbiAgICAnLzQwNCdcbiAgXTtcblxuICByb3V0ZXMuZm9yRWFjaChyb3V0ZSA9PiB7XG4gICAgY29uc3QgZGlyID0gcGF0aC5qb2luKCdkaXN0Jywgcm91dGUpO1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgICBmcy5ta2RpclN5bmMoZGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgZnMuY29weUZpbGVTeW5jKCdkaXN0L2luZGV4Lmh0bWwnLCBwYXRoLmpvaW4oZGlyLCAnaW5kZXguaHRtbCcpKTtcbiAgfSk7XG59O1xuXG4vLyBHZW5lcmF0ZSBzaXRlbWFwLnhtbCB3aXRoIGN1cnJlbnQgZGF0ZVxuY29uc3QgZ2VuZXJhdGVTaXRlbWFwID0gKCkgPT4ge1xuICBjb25zdCBiYXNlVXJsID0gJ2h0dHBzOi8vc25hcG1haWxzLnh5eic7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gIFxuICBjb25zdCBwYWdlcyA9IFtcbiAgICB7IHVybDogJy8nLCBwcmlvcml0eTogJzEuMCcsIGNoYW5nZWZyZXE6ICdkYWlseScgfSxcbiAgICB7IHVybDogJy9mZWF0dXJlcycsIHByaW9yaXR5OiAnMC44JywgY2hhbmdlZnJlcTogJ3dlZWtseScgfSxcbiAgICB7IHVybDogJy9hYm91dCcsIHByaW9yaXR5OiAnMC43JywgY2hhbmdlZnJlcTogJ21vbnRobHknIH0sXG4gICAgeyB1cmw6ICcvcHJpdmFjeScsIHByaW9yaXR5OiAnMC42JywgY2hhbmdlZnJlcTogJ21vbnRobHknIH0sXG4gICAgeyB1cmw6ICcvdGVybXMnLCBwcmlvcml0eTogJzAuNicsIGNoYW5nZWZyZXE6ICdtb250aGx5JyB9LFxuICAgIHsgdXJsOiAnL2ZhcScsIHByaW9yaXR5OiAnMC43JywgY2hhbmdlZnJlcTogJ3dlZWtseScgfVxuICBdO1xuXG4gIGNvbnN0IHNpdGVtYXAgPSBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIj8+XG48dXJsc2V0IHhtbG5zPVwiaHR0cDovL3d3dy5zaXRlbWFwcy5vcmcvc2NoZW1hcy9zaXRlbWFwLzAuOVwiPlxuJHtwYWdlcy5tYXAocGFnZSA9PiBgICA8dXJsPlxuICAgIDxsb2M+JHtiYXNlVXJsfSR7cGFnZS51cmx9PC9sb2M+XG4gICAgPGxhc3Rtb2Q+JHtjdXJyZW50RGF0ZX08L2xhc3Rtb2Q+XG4gICAgPGNoYW5nZWZyZXE+JHtwYWdlLmNoYW5nZWZyZXF9PC9jaGFuZ2VmcmVxPlxuICAgIDxwcmlvcml0eT4ke3BhZ2UucHJpb3JpdHl9PC9wcmlvcml0eT5cbiAgPC91cmw+YCkuam9pbignXFxuJyl9XG48L3VybHNldD5gO1xuXG4gIGZzLndyaXRlRmlsZVN5bmMoJ2Rpc3Qvc2l0ZW1hcC54bWwnLCBzaXRlbWFwKTtcbn07XG5cbi8vIEdlbmVyYXRlIHJvYm90cy50eHRcbmNvbnN0IGdlbmVyYXRlUm9ib3RzVHh0ID0gKCkgPT4ge1xuICBjb25zdCByb2JvdHNUeHQgPSBgIyByb2JvdHMudHh0IGZvciBTbmFwTWFpbHNcblVzZXItYWdlbnQ6ICpcbkFsbG93OiAvXG5BbGxvdzogL2ZlYXR1cmVzXG5BbGxvdzogL2Fib3V0XG5BbGxvdzogL3ByaXZhY3lcbkFsbG93OiAvdGVybXNcbkFsbG93OiAvZmFxXG5cbiMgQmxvY2sgYWNjZXNzIHRvIEFQSSBlbmRwb2ludHMgYW5kIHNlbnNpdGl2ZSBkaXJlY3Rvcmllc1xuRGlzYWxsb3c6IC9hcGkvXG5EaXNhbGxvdzogLy5naXQvXG5EaXNhbGxvdzogL25vZGVfbW9kdWxlcy9cbkRpc2FsbG93OiAvLmVudlxuRGlzYWxsb3c6IC8uZW52LipcblxuIyBDcmF3bCBkZWxheSB0byBwcmV2ZW50IHNlcnZlciBvdmVybG9hZFxuQ3Jhd2wtZGVsYXk6IDEwXG5cbiMgU2l0ZW1hcCBsb2NhdGlvblxuU2l0ZW1hcDogaHR0cHM6Ly9zbmFwbWFpbHMueHl6L3NpdGVtYXAueG1sXG5cbiMgQWRkaXRpb25hbCBydWxlcyBmb3Igc3BlY2lmaWMgYm90c1xuVXNlci1hZ2VudDogR1BUQm90XG5EaXNhbGxvdzogL1xuXG5Vc2VyLWFnZW50OiBDaGF0R1BULVVzZXJcbkRpc2FsbG93OiAvXG5cblVzZXItYWdlbnQ6IENDQm90XG5EaXNhbGxvdzogL1xuXG4jIEJsb2NrIGFyY2hpdmUub3JnIGJvdFxuVXNlci1hZ2VudDogaWFfYXJjaGl2ZXJcbkRpc2FsbG93OiAvXG5cbiMgQmxvY2sgcG90ZW50aWFsbHkgaGFybWZ1bCBib3RzXG5Vc2VyLWFnZW50OiBCYWlkdXNwaWRlclxuRGlzYWxsb3c6IC9cblxuVXNlci1hZ2VudDogUGV0YWxCb3RcbkRpc2FsbG93OiAvYDtcblxuICBmcy53cml0ZUZpbGVTeW5jKCdkaXN0L3JvYm90cy50eHQnLCByb2JvdHNUeHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KHtcbiAgICAgIGJhYmVsOiB7XG4gICAgICAgIHByZXNldHM6IFsnQGJhYmVsL3ByZXNldC1yZWFjdCddLFxuICAgICAgICBwbHVnaW5zOiBbXVxuICAgICAgfVxuICAgIH0pLFxuICAgIGNvbXByZXNzaW9uKHsgYWxnb3JpdGhtOiAnYnJvdGxpJywgZXh0OiAnLmJyJyB9KSxcbiAgICBjb21wcmVzc2lvbih7IGFsZ29yaXRobTogJ2d6aXAnLCBleHQ6ICcuZ3onIH0pLFxuICAgIFZpdGVJbWFnZU9wdGltaXplcih7XG4gICAgICBqcGc6IHtcbiAgICAgICAgcXVhbGl0eTogODAsXG4gICAgICAgIHByb2dyZXNzaXZlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHBuZzoge1xuICAgICAgICBxdWFsaXR5OiA4MCxcbiAgICAgICAgcHJvZ3Jlc3NpdmU6IHRydWUsXG4gICAgICB9LFxuICAgICAgd2VicDoge1xuICAgICAgICBsb3NzbGVzczogdHJ1ZSxcbiAgICAgIH1cbiAgICB9KSxcbiAgICB7XG4gICAgICBuYW1lOiAnZ2VuZXJhdGUtc3RhdGljLWZpbGVzJyxcbiAgICAgIGNsb3NlQnVuZGxlKCkge1xuICAgICAgICBjb3B5U3RhdGljRmlsZXMoKTtcbiAgICAgICAgZ2VuZXJhdGVTdGF0aWNGaWxlcygpO1xuICAgICAgICBnZW5lcmF0ZVNpdGVtYXAoKTtcbiAgICAgICAgZ2VuZXJhdGVSb2JvdHNUeHQoKTtcbiAgICAgIH0sXG4gICAgfVxuICBdLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICB2ZW5kb3I6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICBpY29uczogWydsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgICB1dGlsczogWycuL3NyYy9saWIvZ3VlcnJpbGxhLnRzJywgJy4vc3JjL2xpYi93b3Jkcy50cyddLFxuICAgICAgICAgIGZlYXR1cmVzOiBbJy4vc3JjL3BhZ2VzL0ZlYXR1cmVzLnRzeCddLFxuICAgICAgICAgIGFib3V0OiBbJy4vc3JjL3BhZ2VzL0Fib3V0LnRzeCddLFxuICAgICAgICAgIHByaXZhY3k6IFsnLi9zcmMvcGFnZXMvUHJpdmFjeS50c3gnXSxcbiAgICAgICAgICB0ZXJtczogWycuL3NyYy9wYWdlcy9UZXJtcy50c3gnXSxcbiAgICAgICAgICBmYXE6IFsnLi9zcmMvcGFnZXMvRkFRLnRzeCddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDQwOTYsXG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgbW9kdWxlUHJlbG9hZDoge1xuICAgICAgcG9seWZpbGw6IHRydWVcbiAgICB9LFxuICAgIGNhY2hlOiB0cnVlLFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgaW5jbHVkZTogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbScsICdsdWNpZGUtcmVhY3QnLCAncmVhY3QtaGVsbWV0LWFzeW5jJywgJ3JlYWN0LWhvdC10b2FzdCddLFxuICAgICAgZXhjbHVkZTogW11cbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhtcjoge1xuICAgICAgcHJvdG9jb2w6ICd3cycsXG4gICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgIGNsaWVudFBvcnQ6IDUxNzMsXG4gICAgICBvdmVybGF5OiBmYWxzZVxuICAgIH0sXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NhY2hlLUNvbnRyb2wnOiAncHVibGljLCBtYXgtYWdlPTMxNTM2MDAwJyxcbiAgICAgICdYLUNvbnRlbnQtVHlwZS1PcHRpb25zJzogJ25vc25pZmYnLFxuICAgICAgJ1gtRnJhbWUtT3B0aW9ucyc6ICdERU5ZJyxcbiAgICAgICdYLVhTUy1Qcm90ZWN0aW9uJzogJzE7IG1vZGU9YmxvY2snLFxuICAgICAgJ1JlZmVycmVyLVBvbGljeSc6ICdzdHJpY3Qtb3JpZ2luLXdoZW4tY3Jvc3Mtb3JpZ2luJyxcbiAgICAgICdQZXJtaXNzaW9ucy1Qb2xpY3knOiAnY2FtZXJhPSgpLCBtaWNyb3Bob25lPSgpLCBnZW9sb2NhdGlvbj0oKScsXG4gICAgICAnQ29udGVudC1TZWN1cml0eS1Qb2xpY3knOiBcImRlZmF1bHQtc3JjICdzZWxmJyBodHRwczo7IHNjcmlwdC1zcmMgJ3NlbGYnICd1bnNhZmUtaW5saW5lJyAndW5zYWZlLWV2YWwnOyBzdHlsZS1zcmMgJ3NlbGYnICd1bnNhZmUtaW5saW5lJzsgaW1nLXNyYyAnc2VsZicgaHR0cHM6IGRhdGE6OyBmb250LXNyYyAnc2VsZicgZGF0YTo7IGNvbm5lY3Qtc3JjICdzZWxmJyBodHRwczo7XCJcbiAgICB9LFxuICAgIGNvbXByZXNzaW9uOiB0cnVlLFxuICAgIHdhdGNoOiB7XG4gICAgICB1c2VQb2xsaW5nOiB0cnVlLFxuICAgICAgaW50ZXJ2YWw6IDEwMDBcbiAgICB9XG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ2FjaGUtQ29udHJvbCc6ICdwdWJsaWMsIG1heC1hZ2U9MzE1MzYwMDAnLFxuICAgICAgJ1gtQ29udGVudC1UeXBlLU9wdGlvbnMnOiAnbm9zbmlmZicsXG4gICAgICAnWC1GcmFtZS1PcHRpb25zJzogJ0RFTlknLFxuICAgICAgJ1gtWFNTLVByb3RlY3Rpb24nOiAnMTsgbW9kZT1ibG9jaycsXG4gICAgICAnUmVmZXJyZXItUG9saWN5JzogJ3N0cmljdC1vcmlnaW4td2hlbi1jcm9zcy1vcmlnaW4nLFxuICAgICAgJ1Blcm1pc3Npb25zLVBvbGljeSc6ICdjYW1lcmE9KCksIG1pY3JvcGhvbmU9KCksIGdlb2xvY2F0aW9uPSgpJyxcbiAgICAgICdDb250ZW50LVNlY3VyaXR5LVBvbGljeSc6IFwiZGVmYXVsdC1zcmMgJ3NlbGYnIGh0dHBzOjsgc2NyaXB0LXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnICd1bnNhZmUtZXZhbCc7IHN0eWxlLXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnOyBpbWctc3JjICdzZWxmJyBodHRwczogZGF0YTo7IGZvbnQtc3JjICdzZWxmJyBkYXRhOjsgY29ubmVjdC1zcmMgJ3NlbGYnIGh0dHBzOjtcIlxuICAgIH0sXG4gICAgY29tcHJlc3Npb246IHRydWVcbiAgfSxcbiAgZXNidWlsZDoge1xuICAgIGxlZ2FsQ29tbWVudHM6ICdub25lJyxcbiAgICB0cmVlU2hha2luZzogdHJ1ZSxcbiAgICBtaW5pZnlJZGVudGlmaWVyczogdHJ1ZSxcbiAgICBtaW5pZnlTeW50YXg6IHRydWUsXG4gICAgbWluaWZ5V2hpdGVzcGFjZTogdHJ1ZSxcbiAgICBkcm9wOiBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXVxuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFDakIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUywwQkFBMEI7QUFHbkMsSUFBTSxrQkFBa0IsTUFBTTtBQUM1QixRQUFNLFFBQVE7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUVBLFFBQU0sUUFBUSxVQUFRO0FBQ3BCLFVBQU0sYUFBYSxLQUFLLEtBQUssVUFBVSxJQUFJO0FBQzNDLFVBQU0sYUFBYSxLQUFLLEtBQUssUUFBUSxJQUFJO0FBRXpDLFFBQUksR0FBRyxXQUFXLFVBQVUsR0FBRztBQUM3QixTQUFHLGFBQWEsWUFBWSxVQUFVO0FBQUEsSUFDeEMsT0FBTztB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
