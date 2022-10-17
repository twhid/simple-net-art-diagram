const { copyFileSync } = require("fs");

copyFileSync("src/addresses.json", "dist/addresses.json");
copyFileSync("src/SimpleNetArtDiagram.json", "dist/SimpleNetArtDiagram.json");
copyFileSync("src/SimpleNetArtDiagramDataUri.js", "dist/SimpleNetArtDiagramDataUri.js");
