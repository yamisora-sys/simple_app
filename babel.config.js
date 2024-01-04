module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins:[
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './components',
            '@assets': './assets',
            '@constants': './constants',
            '@models': './models',
            '@screens': './screens',
            '@store': './store',
            '@utils': './utils',
          }
        }
      ]
    ]
  };
};
