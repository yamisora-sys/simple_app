module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-classname-to-style',
      ['react-native-platform-specific-extensions', {extensions: ['css']}],
      ['module-resolver', {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@assets': './assets',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@store': './src/store',
          '@config': './src/config',
          '@context': './src/context',
          '@models': './src/models',
          '@types': './src/types',
          '@theme': './src/theme',
          '@pages': './src/pages',
        },
      }]
    ]
  };
};
