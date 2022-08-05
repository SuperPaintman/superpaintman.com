#!/usr/bin/env node

/*!
 * Copyright (C) 2017-2022 Aleksandr Krivoshchekov <SuperPaintmanDeveloper@gmail.com>
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

'use strict';
/* Imports */
const fs = require('fs');
const { join, parse } = require('path');
const { promisify } = require('util');
const glob = require('glob');

/* Constants */
const ROOT = join(__dirname, '..');

const LICENSE = `
Copyright (C) 2017-${new Date().getFullYear()} Aleksandr Krivoshchekov <SuperPaintmanDeveloper@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`.trim();

/* Init */
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const globAsync = promisify(glob);

/* Functions */
async function updateContentLicense(
  content,
  startPart,
  endPart,
  offset = '\n'
) {
  let start = 0;
  let end = 0;

  const oldStart = content.indexOf(startPart);
  if (oldStart !== -1) {
    const oldEnd = content.indexOf(endPart, oldStart + startPart.length);
    if (oldEnd !== -1) {
      start = oldStart;
      end = oldEnd + endPart.length;

      for (let i = end + 1; i < content.length; i++) {
        if (content[i] !== '\n') {
          break;
        }

        end++;
      }
    }
  }

  const before = content.slice(0, start);
  const after = content.slice(end);

  const license = LICENSE.split('\n')
    .map((line) => ` * ${line}`.trimRight())
    .join('\n');

  return before + startPart + '\n' + license + '\n' + endPart + offset + after;
  // return before.trim() + after.trim() + '\n';
}

async function updateContent(content, ext) {
  switch (ext) {
    case '.js':
    case '.ts':
      return updateContentLicense(content, '/*!', ' */');
    case '.html':
    case '.svelte':
      return updateContentLicense(content, '<!--!', '-->', '');
    case '.css':
    case '.styl':
      return updateContentLicense(content, '/*!', ' */');
    default:
      throw new Error(`Unknown ext: ${ext}`);
  }
}

async function updateFile(filename) {
  const { ext } = parse(filename);
  const content = await readFileAsync(filename, 'utf-8');

  const newContent = await updateContent(content, ext);

  if (content !== newContent) {
    await writeFileAsync(filename, newContent, 'utf-8');
  }
}

/* Main */
async function main() {
  // Find all files.
  const files = [
    ...(await globAsync(join(ROOT, './src/**/*.{js,ts,svelte,css,styl,html}'))),
    ...(await globAsync(join(ROOT, './scripts/*.{js,ts}'))),
    ...(await globAsync(join(ROOT, './webpack.config.{js,ts}')))
  ];

  // Update files.
  for (const file of files) {
    await updateFile(file);
  }
}

if (!module.parent) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
