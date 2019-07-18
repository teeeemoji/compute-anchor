import pkg from "./package.json";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";

export default [
  {
    input: "./index.js",
    output: {
      name: "computedAnchor",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [
      nodeResolve({
        browser: true
      }),
      commonjs({
        include: ["node_modules/**"],
        namedExports: {
          "node_modules/lodash/debounce.js": ["debounce"]
        }
      }),
      babel({
        babelrc: true
      })
    ]
  }
];
