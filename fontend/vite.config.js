const path = require('path')
module.exports = {
    hostname: '0.0.0.0',
    port: 3000,
    proxy: {
        '/api': {
            target: 'http://localhost:7001',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                lessOptions: {
                    // If you are using less-loader@5 please spread the lessOptions to options directly
                    modifyVars: {
                        'primary-color': '#1DA57A',
                        'link-color': '#1DA57A',
                        'border-radius-base': '2px',
                    },
                    javascriptEnabled: true,
                },
            },
        }
    }
}