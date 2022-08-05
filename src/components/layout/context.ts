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

import { getContext, setContext } from 'svelte';
import { StackableStore } from '~/lib/store';
import type { Readable } from 'svelte/store';

const LAYOUT = {};

export type Unset = () => void;

export class LayoutContext {
  private _stores: { [key: string]: StackableStore<boolean> | undefined } = {};

  get(name: string): Readable<boolean> {
    let store = this._stores[name];
    if (store === undefined) {
      store = new StackableStore<boolean>(true);
      this._stores[name] = store;
    }

    return store;
  }

  set(name: string, value: boolean): Unset {
    let store = this._stores[name];
    if (store === undefined) {
      store = new StackableStore<boolean>(true);
      this._stores[name] = store;
    }

    return store.set(value);
  }
}

export const noopUnset: Unset = () => undefined;

const noopContext = new LayoutContext();

export function getLayoutContext(): LayoutContext {
  return getContext(LAYOUT) || noopContext;
}

export function setLayoutContext(): void {
  setContext(LAYOUT, new LayoutContext());
}
