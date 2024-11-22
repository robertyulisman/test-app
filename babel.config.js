module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: ['API_URL'],
        safe: true,
        allowUndefined: false,
        verbose: false,
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
