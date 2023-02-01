var path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          extensions: ['.js', '.ios.js', '.android.js', '.json', '.tsx', '.ts'],
          alias: {
            '@dplus/base/dist': path.resolve(
              __dirname,
              '..',
              'packages/base/src'
            ),
            '@dplus/themed': path.resolve(
              __dirname,
              '..',
              'packages/themed/src'
            ),
            '@expo/vector-icons/Icon': path.resolve(
              __dirname,
              '..',
              'node_modules/@expo/vector-icons/build/Icons'
            ),
            '@dplus/base': path.resolve(__dirname, '..', 'packages/base/src'),
          },
        },
      ],
    ],
  };
};
