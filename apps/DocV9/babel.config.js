module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ["babel-plugin-react-docgen-typescript", { exclude: "node_modules" }],
      [
        'module-resolver',
        {
          root:["./"],
          alias: {
            "@crossed/ui/src":"./node_modules/@crossed/ui/src",
          },
          extensions: ['.tsx', '.js', '.ts','.jsx', '.json'],
        },
      ],
    ],
  };
};
