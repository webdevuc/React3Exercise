const path = require("path");

module.exports = {
    mode: "development",
    entry: "./index.tsx",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "main.js"
    },
    target: "node",
    devServer: {
        port: "9500",
        contentBase: ["./public"],
        open: true
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
        rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve('./tsconfig.json'),
                            },
                        },
                    ]                    
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader'
                }
        ]
    }
}