const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
/* 打包体积可视化插件 */
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
/* 压缩 */
const CompressionPlugin = require("compression-webpack-plugin");

const { moduleRules } = require('./module/module')

const conf = {
  externals: {},
  module: {
    rules:  moduleRules,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(process.cwd(), "src"),
      vue$: "vue/dist/vue.js",
      utils: path.resolve(process.cwd(), "src/utils/index.ts"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Output Management",
      template: path.resolve(process.cwd(), "public/index.html"),
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg|webp|png)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};

// 可视化打包文件插件
if (process.env.buildvisual) {
  conf.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = conf;
