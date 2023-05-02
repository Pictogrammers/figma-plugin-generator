import { argv } from 'node:process';
import fs from 'node:fs/promises';

import config from './config.mjs';

const libraryId = argv[2];

if (!libraryId) {
  console.error('ERROR: Please supply an libraryId to build.');
  process.exit(1);
}

try {
  const librariesRes = await fetch('https://pictogrammers.com/data/libraries.json');
  const librariesData = await librariesRes.json();

  if (!Object.keys(librariesData).includes(libraryId)) {
    console.error('ERROR: Provided libraryId does not exist.');
    process.exit(1);
  }

  const libraryMeta = librariesData[libraryId];
  libraryMeta.id = libraryId;
  libraryMeta.name = config[libraryId].name;
  libraryMeta.grid = config[libraryId].grid;

  const libraryImageRes = await fetch(`https://pictogrammers.com/images/libraries/${libraryId}.svg`);
  const libraryImageData = await libraryImageRes.arrayBuffer();
  libraryMeta.logo = `data:image/svg+xml;base64,${Buffer.from(libraryImageData).toString('base64')}`;

  const libraryRes = await fetch(`https://pictogrammers.com/data/${libraryId}-${libraryMeta.version}.json`);
  const libraryData = await libraryRes.text();

  await fs.writeFile('./src/app/data/libraryMeta.json', JSON.stringify(libraryMeta), { flag: 'w' });
  await fs.writeFile('./src/app/data/library.json', libraryData, { flag: 'w' });
  await fs.copyFile(`./manifest-${libraryId}.json`, './manifest.json');

  // eslint-disable-next-line no-console
  console.log('INFO: Wrote library info to data folder.');
} catch (err) {
  console.error(`ERROR: ${err}`);
  process.exit(1);
}

