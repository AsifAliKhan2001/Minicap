module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxRuntime: 'automatic' }],
      '@babel/preset-react'
    ],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./src"],
          "extensions": [".js", ".jsx", ".ts", ".tsx", ".json"]
        }
      ],
      "react-native-reanimated/plugin"
    ],
  };
};
