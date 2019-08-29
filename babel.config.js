module.exports = {
  "env":{
    "development":{
      "sourceMaps":true,
      "retainLines":true, 
    }
  },
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
