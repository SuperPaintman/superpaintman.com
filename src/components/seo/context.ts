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

'use strict';

import { getContext, setContext } from 'svelte';
import {
  StackableStore,
  mergeUniqArray,
  mergeDeepUniqObjects
} from '~/lib/store';
import type { Readable } from 'svelte/store';

const SEO = {};

export type Unset = () => void;

type Robots = {
  noIndex: boolean;
  noFollow: boolean;
};

type Twitter = {
  fallback?: boolean;
  title?: string;
  description?: string;
  image?: {
    url?: string;
    alt?: string;
  };
  card?: string;
  site?: string;
  domain?: string;
};

type OpenGraph = {
  fallback?: boolean;
  locale?: string;
  type?: string;
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
  image?: {
    url?: string;
    alt?: string;
    width?: number;
    heigth?: number;
  };
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    expirationTime?: string;
    section?: string;
    author?: string;
    tags?: string[];
  };
};

export class SeoContext {
  private _title: StackableStore<string | undefined>;
  private _description: StackableStore<string | undefined>;
  private _robots: StackableStore<Robots>;
  private _keywords: StackableStore<string[]>;
  private _canonical: StackableStore<string | undefined>;
  private _themeColor: StackableStore<string | undefined>;
  private _twitter: StackableStore<Twitter | undefined>;
  private _openGraph: StackableStore<OpenGraph | undefined>;

  constructor() {
    this._title = new StackableStore<string | undefined>(undefined);
    this._description = new StackableStore<string | undefined>(undefined);
    this._robots = new StackableStore<Robots>({
      noIndex: false,
      noFollow: false
    });
    this._keywords = new StackableStore<string[]>([], mergeUniqArray);
    this._canonical = new StackableStore<string | undefined>(undefined);
    this._themeColor = new StackableStore<string | undefined>(undefined);
    this._twitter = new StackableStore<Twitter | undefined>(
      undefined,
      mergeDeepUniqObjects
    );
    this._openGraph = new StackableStore<OpenGraph | undefined>(
      undefined,
      mergeDeepUniqObjects
    );
  }

  get title(): Readable<string | undefined> {
    return this._title;
  }

  setTitle(value: string): Unset {
    return this._title.set(value);
  }

  get description(): Readable<string | undefined> {
    return this._description;
  }

  setDescription(value: string): Unset {
    return this._description.set(value);
  }

  get robots(): Readable<Robots> {
    return this._robots;
  }

  setRobots(value: Robots): Unset {
    return this._robots.set(value);
  }

  get keywords(): Readable<string[]> {
    return this._keywords;
  }

  setKeywords(value: string[]): Unset {
    return this._keywords.set(value);
  }

  get canonical(): Readable<string | undefined> {
    return this._canonical;
  }

  setCanonical(value: string | undefined): Unset {
    return this._canonical.set(value);
  }

  get themeColor(): Readable<string | undefined> {
    return this._themeColor;
  }

  setThemeColor(value: string | undefined): Unset {
    return this._themeColor.set(value);
  }

  get twitter(): Readable<Twitter | undefined> {
    return this._twitter;
  }

  setTwitter(value: Twitter | undefined): Unset {
    return this._twitter.set(value);
  }

  get openGraph(): Readable<OpenGraph | undefined> {
    return this._openGraph;
  }

  setOpenGraph(value: OpenGraph | undefined): Unset {
    return this._openGraph.set(value);
  }
}

export const noopUnset: Unset = () => undefined;

const noopContext = new SeoContext();

export function getSeoContext(): SeoContext {
  return getContext(SEO) || noopContext;
}

export function setSeoContext(): void {
  setContext(SEO, new SeoContext());
}
