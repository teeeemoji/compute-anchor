import pkg from "./package.json";
import progress from "rollup-plugin-progress";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";

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
      })
    ]
  },
  {
    /**
     * to build demo page, and demo page is also for jest test
     */
    input: "./demo/src/index.js",
    output: [
      {
        file: "demo/dist/index.js",
        format: "umd"
        // sourcemap: 'inline'
      }
    ],
    plugins: [
      progress(),
      nodeResolve({
        browser: true
      }),
      commonjs({
        include: ["node_modules/**"],
        exclude: [
          // 'node_modules/process-es6/**'
        ],
        namedExports: {
          "node_modules/react/index.js": [
            "Children",
            "Component",
            "PropTypes",
            "createElement"
          ],
          "node_modules/react-dom/index.js": ["render"],
          "node_modules/lodash/debounce.js": ["debounce"]
        }
      }),
      babel({
        babelrc: true
      }),
      postcss({
        extensions: [".css"]
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      })
    ]
  }
];
