const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { 
        target: 'https://api.warframestat.us',
        changeOrigin: true,
        pathRewrite:{
            '^/api': '/'
        }
    }));
};