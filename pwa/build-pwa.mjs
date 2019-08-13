import sharp from "sharp";
import baseFs from "fs";

// fs.promises needs Node 10+
const fs = baseFs.promises;

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

const logError = error => console.log(error);

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

const awaitAllResizes = Promise.all(iconSizes.map(resize))
  .then(() => console.log("resizing complete"))
  .catch(logError);

const parseJSON = data => JSON.parse(data);
const stringifyPretty = data => JSON.stringify(data, null, 2);
const addGameData = template => Object.assign(template, getChanges());
const saveManifest = json => fs.writeFile(outputPath + "manifest.json", json);

//Write Manifest
const awaitManifest = fs
  .readFile(manifestTemplate, "utf-8")
  .then(parseJSON)
  .then(addGameData)
  .then(stringifyPretty)
  .then(saveManifest)
  .then(() => console.log("manifest saved."))
  .catch(logError);

Promise.all([awaitAllResizes, awaitManifest]).then(() =>
  console.log("PWA files created. Operation complete.")
);
