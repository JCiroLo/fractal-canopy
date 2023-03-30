module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/fractal-canopy/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/_Config.scss";'
      }
    }
  }
}
