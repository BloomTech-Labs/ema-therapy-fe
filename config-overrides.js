const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const path = require('path');

// https://ant.design/docs/react/use-with-create-react-app#Advanced-Guides

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      // override any defaults from https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      '@primary-color': '#1DA57A',
    },
  }),
  // https://github.com/ant-design/ant-design/issues/12011#issuecomment-552117531
  // eslint-disable-next-line func-names
  function(config) {
    const alias = config.resolve.alias || {};
    alias['@ant-design/icons/lib/dist$'] = path.resolve(
      __dirname,
      './src/icons.js',
    );
    config.resolve.alias = alias; // eslint-disable-line no-param-reassign
    return config;
  },
);
