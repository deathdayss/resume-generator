const webpack = require("webpack");
const path = require("path");
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
    webpack: {
        alias: {
            "@": resolve("src")
        },
        configure: {
            resolve: {
                fallback: {
                    process: require.resolve("process/browser"),
                    zlib: require.resolve("browserify-zlib"),
                    stream: require.resolve("stream-browserify"),
                    util: require.resolve("util"),
                    buffer: require.resolve("buffer"),
                    asset: require.resolve("assert"),
                },
            },
            plugins: [
                new webpack.ProvidePlugin({
                    Buffer: ["buffer", "Buffer"],
                    process: "process/browser",
                }),
            ],
        },
    },
};