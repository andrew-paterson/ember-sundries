const sass = require('sass');
const fs = require('fs');
const path = require('path');

const scssFiles = findScssFiles('./src');

scssFiles.forEach((file) => {
  const result = sass.compile(file, {
    sourceMap: false,
    // outputStyle: 'compressed',
  });

  const outputPath = file
    .replace('src/scss/ember-sundries/_', 'src/components/ember-sundries/')
    .replace('.scss', '.css');
  console.log(outputPath);
  // console.log(file);
  const css = result.css;
  fs.writeFileSync(outputPath, css);
  // if (!item.sourceMap) {
  //   return;
  // }
  // console.log(`${outputPath}.map`);
  // fs.writeFileSync(`${outputPath}.map`, JSON.stringify(result.sourceMap));
});

console.log('Sass compiled to CSS.');

function findScssFiles(directory) {
  let scssFiles = [];

  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scssFiles = scssFiles.concat(findScssFiles(fullPath));
    } else if (stat.isFile() && path.extname(file) === '.scss') {
      scssFiles.push(fullPath);
    }
  });

  return scssFiles;
}
