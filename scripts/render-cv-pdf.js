#!/usr/bin/env node

/*!
 * Copyright (C) 2017-2021 Aleksandr Krivoshchekov <SuperPaintmanDeveloper@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* Imports */
const fs = require('fs');
const { join, dirname } = require('path');
const { promisify } = require('util');
const puppeteer = require('puppeteer');
const which = require('which');
const mkdirp = require('mkdirp');
const express = require('express');

/* Constants */
const ROOT = join(__dirname, '..');
const OUTPUT = join(ROOT, 'public/pdf/Aleksandr_Krivoshchekov_CV_Resume.pdf');

/* Init */
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const whichAsync = promisify(which);

/* Funcions */
async function startStaticServer() {
  const app = express();

  const indexHtml = await readFileAsync(join(ROOT, 'public/index.html'));

  app.use(express.static(join(ROOT, 'public')));
  app.use('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(indexHtml);
  });

  const server = await new Promise((resolve, reject) => {
    let server;
    server = app.listen(0, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(server);
    });
  });

  const addr = server.address();

  return {
    address: `localhost:${addr.port}`,
    close: () => server.close()
  };
}

async function findBrowserExecutable() {
  try {
    const path = await whichAsync('firefox');
    return { product: 'firefox', path };
  } catch (err) {}

  try {
    const path = await whichAsync('chrome');
    return { product: 'chrome', path };
  } catch (err) {}

  try {
    const path = await whichAsync('chromium');
    return { product: 'chrome', path };
  } catch (err) {}

  throw new Error('Browser not found');
}

/* Main */
async function main() {
  console.log('Start static server');
  const server = await startStaticServer();

  console.log('Find browser executable');
  const browserExecutable = await findBrowserExecutable();
  console.log('Browser executable has found', browserExecutable);

  console.log('Start browser');
  const browser = await puppeteer.launch({
    product: browserExecutable.product,
    executablePath: browserExecutable.path,
    extraPrefsFirefox: {
      'layout.css.font-variations.enabled': false
    }
  });

  console.log('Open new page');
  const page = await browser.newPage();

  let i = 0;
  while (true) {
    const url = `http://${server.address}/cv?format=pdf`;
    console.log('Go to', {
      url
    });

    try {
      await page.goto(url, {
        // waitUntil: 'networkidle0'
        timeout: 5000
      });

      break;
    } catch (err) {
      if (i < 3) {
        console.error('Failed to go to the page', {
          url,
          i,
          error: err.message
        });
        continue;
      }

      throw err;
    } finally {
      i++;
    }
  }

  console.log('Render page as pdf');
  const data = await page.pdf({
    printBackground: true,
    format: 'a4'
  });

  const dir = dirname(OUTPUT);
  console.log('Create output dir', { dir });
  await mkdirp(dir);

  console.log('Write pdf file');
  await writeFileAsync(OUTPUT, data, 'utf-8');

  await browser.close();
  await server.close();
}

if (!module.parent) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
