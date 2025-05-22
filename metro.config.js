const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// 👇 Modify assetExts and sourceExts for SVGs
const { assetExts, sourceExts } = config.resolver;
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
config.resolver.assetExts = assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts = [...sourceExts, "svg"];

// 👇 Wrap with NativeWind
module.exports = withNativeWind(config, { input: "./app/global.css" });
