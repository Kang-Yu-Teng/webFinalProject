module.exports = {    
    entry: './js/main.js',    
    output: {    
        path: __dirname,    
        filename: './js/output.js',    
    },    
    module: {    
        loaders: [{    
            test: /\.js$/,    
            exclude: /node_modules/,    
            loader: 'babel-loader'    
        }]    
    }    
}    
