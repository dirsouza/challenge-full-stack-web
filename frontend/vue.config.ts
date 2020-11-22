export default {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    port: 8080,
  },
  configureWebpack: {
    output: {
      filename: '[name].[hash].bundle.js',
    },
  },
};
