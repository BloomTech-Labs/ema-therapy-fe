const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      // override any defaults from...
      // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      // '@primary-color': '#BADA55',
    },
  }),
);
