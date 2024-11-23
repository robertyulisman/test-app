module.exports = {
  project: {
    android: {},
  },
  assets: ['src/Assets/fonts/'],
  dependencies: {
    ...(process.env.NO_FLIPPER ? { 'react-native-flipper': { platforms: { ios: null } } } : {}),
  },
};
