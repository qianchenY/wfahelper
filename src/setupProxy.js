const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/wfa', { 
        target: 'https://api.warframestat.us',
        changeOrigin: true,
        pathRewrite:{
            '^/wfa': '/'
        }
    }));
    app.use(proxy('/baidu', { 
        target: 'http://api.fanyi.baidu.com',
        changeOrigin: true,
        pathRewrite:{
            '^/baidu': '/'
        }
    }));
};