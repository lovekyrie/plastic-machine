/* eslint-disable no-console */
/* eslint-disabled */

const path = require("path");
const fs = require("fs");
const glob = require("glob");
const colors = require("colors-console");
const configObj = require("./src/assets/js/config");
const vConsolePlugin = require("vconsole-webpack-plugin"); // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const CompressionPlugin = require("compression-webpack-plugin"); //Gzip
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin; //Webpack包文件分析器

// 配置选项
const config = {
  devServer: {
    proxy: {
      "/api": {
        target: configObj.serverUrl, //接口地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "/pc/" : "/",
  outputDir: "dist", //默认为dist
  assetsDir: "static",
  pages: Object.assign(getPages(), {
    app: "./src/main.js" // 配置主入口文件（会生成 app.html，vue cli3并没有提供直接配置入口文件的选项）
  }),
  runtimeCompiler: false,
  productionSourceMap: false,
  configureWebpack: config => {
    //生产and测试环境
    let pluginsPro = [
      new CompressionPlugin({
        //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
        threshold: 8192,
        minRatio: 0.8
      }),
      //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      new BundleAnalyzerPlugin()
    ];
    //开发环境
    let pluginsDev = [
      //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
      new vConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: true // 发布代码前记得改回 false
      })
    ];
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsPro];
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev];
    }
  }
};

// 获取多页面的配置数据
function getPages() {
  const pages = {};
  const pagesJson = require("./config/page.json");

  glob.sync("./src/views/**/*.vue").forEach(function(pageUrl) {
    const ext = path.extname(pageUrl);
    const pageCode = path.basename(pageUrl, ext);
    // 文件名不能重复的验证（pageCode 在这里取的是文件名）
    if (pages[pageCode]) {
      console.error(colors("red", `文件名不能重复使用：${pageCode}。\n`));
      process.exit(1);
    }
    // 生成入口文件
    const entryFile = `./entry/${pageCode}.js`;
    fs.exists(entryFile, function(exists) {
      // 这里没有对文件目录进行判断，所以需要先建一个'entry'文件夹，否则会报错
      if (exists) return;
      // 创建文件及写入文件内容
      const appTpl = "." + pageUrl;
      const entryData = `import Vue from 'vue';\nimport App from '${appTpl}';\nimport init from "../src/assets/js/init";\n
        Vue.use(init);\nVue.config.productionTip = false;\nnew Vue({ render: h => h(App) }).$mount('#${pageCode}'); `;
      fs.writeFile(entryFile, entryData, function(err) {
        // err.code === 'ENOENT'
        if (err) console.log(err);
      });
    });
    // 自定义页面数据
    const pageData = pagesJson[pageCode] || {};
    Object.assign(pageData, {
      url: pageUrl,
      code: pageCode
    });
    // 配置多页面
    pages[pageCode] = {
      entry: entryFile, // 入口文件
      template: "./public/index.html", // 模板文件
      filename: pageCode + ".html", // 打包后的文件路径
      minify: false, // 是否压缩
      chunks: ["chunk-vendors", "chunk-common", "app", pageCode], // 引入资源文件
      chunksSortMode: "manual", // 控制 chunk 的排序。none | auto（默认）| dependency（依赖）| manual（手动）| {function}
      pageData: pageData
    };
  });
  return pages;
}

module.exports = config;
