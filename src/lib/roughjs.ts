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

import type { default as _roughjs } from 'roughjs';
import type { Options } from 'roughjs/bin/core';
const roughjs = require('roughjs/bundled/rough.cjs.js') as typeof _roughjs;

export { roughjs };
export type { Options } from 'roughjs/bin/core';
export type { RoughCanvas } from 'roughjs/bin/canvas';

export function defaultOptions(overrides?: Options): Options {
  return {
    fillStyle: 'hachure',
    fillWeight: 2,
    roughness: 0.5, // 1
    strokeWidth: 2,
    hachureGap: 4,

    ...overrides
  };
}
