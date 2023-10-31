const esbuild = require("esbuild");
const isDev = process.argv.includes("--dev");
const targetBrowser = ["chrome58", "firefox57", "safari11", "edge18"];
const targetES = "es6";

const callback = async (ctx) => {
  if (isDev) {
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
};
const commonOption = {
  bundle: false,
  logLevel: "info",
  color: true,
  // minify: true,
  // minifyWhitespace: true,
  // minifyIdentifiers: true,
  minifySyntax: true,
};
const startTime = new Date().getTime();
Promise.all([
  esbuild
    .context({
      ...commonOption,
      entryPoints: ["./index.js"],
      outdir: "./lib",
      platform: "neutral",
      target: targetES,
    })
    .then(callback),
  esbuild
    .context({
      ...commonOption,
      entryPoints: ["./modules/**/**.js"],
      outdir: "./lib/modules",
      platform: "neutral",
      target: targetES,
    })
    .then(callback),
]).then((result) => {
  if (!isDev) {
    console.log(`⚡️ ${new Date().getTime() - startTime}ms`);
    console.log("build done!");
  }
});
