module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-classname-to-style',
      ['react-native-platform-specific-extensions', {extensions: ['css']}],
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@config': './src/config',
            '@pages': './src/pages',
            '@migration': './src/migration',
            '@context': './src/context',
            '@style': './src/style',
          },
        },
      ],
    ]
  };
};
