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

// Create PWA Icons
const srcIcon = "pwa/icon.png";
const outputPath = "pwa/icons/";
const iconSizes = [512, 384, 192, 152, 144, 128, 96, 72];

const resize = size =>
  sharp(srcIcon)
    .resize(size, size)
    .toFile(`${outputPath}icon-${size}x${size}.png`);

Promise.all(iconSizes.map(resize)).then(() => {
  console.log("resizing complete");
});

// Write out manifest
const manifestTemplate = "pwa/manifest-template.json";
const manifestOutput = "pwa/manifest.json";
fs.readFile(manifestTemplate, "utf-8", (err, data) => {
  if (err) throw err;

  const manifest = JSON.parse(data);
  //TODO Things to change - where can we get the app name during the build?
  // name and short_name prob the same? or perhaps wrapped with "BBC GAMES: ####" ?
  //
  // name
  // short_name
  // theme_color
  // background-color
  // orientation (always landscape currently but potentially need to support in the future)
  const changes = {
	name: "BBC GAMES: test_name",
	short_name: "test name",
  }

  Object.assign(manifest, changes);

  fs.writeFile(manifestOutput, JSON.stringify(manifest), err => {
    if (err) console.log(err);
    console.log("manifest written")
  });
});
