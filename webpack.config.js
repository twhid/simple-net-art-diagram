module.exports = {
    devtool: false,
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: __dirname,
        library: "SimpleNetArtDiagram",
        libraryTarget: "umd",
        globalObject: "this",
    },
};
