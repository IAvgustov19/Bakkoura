module.exports = {
  root: true,
  extends: '@react-native',
  env: {
    // mavjud o'zgaruvchilaringiz
  },
  plugins: ['module-resolver'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
