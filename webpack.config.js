const path = require('path');
module.exports = {
    mode:"production",
    entry: "./src/app.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "view")
    },
    devServer: {
        static: "./view",
        historyApiFallback:true
    },
    performance:{
        hints: false
    }
}