const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/pc', { 
        target: 'http://api.warframestat.us',
    }));
};