const path = require("path");

module.exports = {
    devtool: false,
    mode: "production",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: { configFile: path.resolve(__dirname, "src/tsconfig.json") },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".json"],
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        library: "Simple_Net_Art_Diagram",
        libraryTarget: "umd",
        globalObject: "this",
    },
};
