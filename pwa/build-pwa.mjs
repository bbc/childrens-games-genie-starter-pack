import sharp from "sharp";
import fs from "fs";

/*
 * TODO
 * 1. Output manifest from template
 * 2. Output html file?
 * 3. Output service worker.
 *      Service workers require far more investigation:
 *      - Do we need one per game or a shared one?
 *      - which features require service support?
 *          - caching of files
 */

//sources
const srcIcon = "pwa/icon.png";
const manifestTemplate = "pwa/manifest-template.json";

// TODO this will need to return values from the theme and/or embedvars
const getChanges = () => {
  //TODO Things to change - where can we get the app name during the build?
  // name and short_name prob the same? or perhaps wrapped with "BBC GAMES: ####" ?
  //
  // name
  // short_name
  // theme_color
  // background-color
  // orientation (always landscape currently but potentially need to support in the future)

  return {
    name: "BBC GAMES: test_name",
    short_name: "test name"
  };
};

// Create PWA Icons
const outputPath = "pwa/";

const iconOutputPath = outputPath + "icons/";
const iconSizes = [512, 384, 192, 152, 144, 128, 96, 72];

const resize = size =>
  sharp(srcIcon)
    .resize(size, size)
    .toFile(`${iconOutputPath}icon-${size}x${size}.png`);

Promise.all(iconSizes.map(resize)).then(() => {
  console.log("resizing complete");
});

//Write Manifest
fs.readFile(manifestTemplate, "utf-8", (err, data) => {
  if (err) throw err;

  const manifest = JSON.parse(data);

  Object.assign(manifest, getChanges());

  fs.writeFile(
    outputPath + "manifest.json",
    JSON.stringify(manifest, null, 2),
    err => {
      if (err) console.log(err);
      console.log("manifest written");
    }
  );
});
