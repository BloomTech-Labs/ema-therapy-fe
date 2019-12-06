const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const modifyVars = require('./src/styles/style-overrides');

// https://ant.design/docs/react/use-with-create-react-app#Advanced-Guides

module.exports = override(
  // https://ant.design/docs/react/use-with-create-react-app#Use-babel-plugin-import
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // https://ant.design/docs/react/use-with-create-react-app#Customize-Theme
  addLessLoader({
    javascriptEnabled: true,
    // override any defaults from https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
    // must restart the server for changes to take effect
    modifyVars,
  }),
);
