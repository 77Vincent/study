export default (() => {
  window.gconfig = {};
  +(function (global) {
    // 本地开发打开的路径以及端口
    global.linkUrl = 'http://localhost:3000';
    if (process.env.NODE_ENV === 'production') { // 生产环境用不同的接口地址
      global.linkUrl = 'http://localhost:3000';
    }
  }(window.gconfig));
})();
  
export const prefix = global.gconfig.linkUrl;
export const suffix = '.json';
  