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
import type { Readable, Subscriber, Unsubscriber } from 'svelte/store';

const SEO = {};

export type Unset = () => void;

function mergeUniqArray<T extends unknown>(groups: T[][]): T[] {
  const res = [];
  for (const values of groups) {
    for (const value of values) {
      if (res.indexOf(value) !== -1) {
        continue;
      }

      res.push(value);
    }
  }

  return res;
}

function isArray(value: unknown): value is unknown[] {
  if (value === null) {
    return false;
  }

  if (typeof value !== 'object') {
    return false;
  }

  if (typeof (value as unknown[]).length !== 'number') {
    return false;
  }

  return Object.prototype.toString.call(value) === '[object Array]';
}

function deepClone<T extends unknown>(value: T): T {
  if (value === null) {
    return null as any;
  }

  if (value === undefined) {
    return undefined as any;
  }

  if (typeof value === 'function') {
    return value;
  }

  if (typeof value !== 'object') {
    return value;
  }

  if (isArray(value)) {
    return value.map((v) => deepClone(v)) as any;
  }

  const res = {} as any;

  for (const key of Object.getOwnPropertyNames(value)) {
    res[key] = deepClone((value as any)[key]);
  }

  return res;
}

function deepUniqMerge<T extends Record<any, any>>(dest: T, src: T): void {
  for (const key of Object.getOwnPropertyNames(src)) {
    const value = src[key];

    if (!dest.hasOwnProperty(key)) {
      (dest as any)[key] = deepClone(value);
      continue;
    }

    const old = (dest as any)[key] as unknown;

    if (typeof old === 'undefined' || old === null) {
      continue;
    }

    if (typeof old === 'function') {
      continue;
    }

    if (typeof old !== 'object') {
      continue;
    }

    if (isArray(old) && isArray(value)) {
      mergeUniqArray([value, old]);
      continue;
    }

    deepUniqMerge(old, value);
  }
}

function mergeDeepUniqObjects<T extends Record<any, any> | undefined>(
  values: T[]
): T {
  const res = {} as any;

  for (let i = values.length - 1; i >= 0; i--) {
    const obj = values[i];
    if (obj === undefined) {
      continue;
    }

    deepUniqMerge(res, obj);
  }

  return res;
}

class StackableStore<T> implements Readable<T> {
  private _values: Array<{ value: T }> = [];
  private _subscribers: Array<Subscriber<T>> = [];

  constructor(private _default: T, private _merge?: (values: T[]) => T) {}

  set(value: T): Unset {
    const v = { value };

    this._values.push(v);
    this._notifyAll();

    return () => {
      for (let i = 0, ii = this._values.length; i < ii; i++) {
        if (this._values[i] === v) {
          this._values.splice(i, 1);
          break;
        }
      }

      this._notifyAll();
    };
  }

  subscribe(
    run: Subscriber<T>,
    invalidate?: (value?: T) => void
  ): Unsubscriber {
    this._subscribers.push(run);
    this._notify(run);

    return () => {
      for (let i = 0, ii = this._subscribers.length; i < ii; i++) {
        if (this._subscribers[i] === run) {
          this._subscribers.splice(i, 1);
          return;
        }
      }
    };
  }

  private _notify(subscriber: Subscriber<T>): void {
    const value = this._value();

    subscriber(value);
  }

  private _notifyAll(): void {
    for (const subscriber of this._subscribers) {
      this._notify(subscriber);
    }
  }

  private _value(): T {
    if (this._merge === undefined) {
      const lastValue =
        this._values.length > 0
          ? this._values[this._values.length - 1]
          : undefined;

      return lastValue !== undefined ? lastValue.value : this._default;
    }

    const values = [this._default];
    for (const v of this._values) {
      values.push(v.value);
    }

    return this._merge(values);
  }
}

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
