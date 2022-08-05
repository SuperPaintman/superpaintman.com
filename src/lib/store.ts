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

import type { Readable, Subscriber, Unsubscriber } from 'svelte/store';

export type Unset = () => void;

export function mergeUniqArray<T extends unknown>(groups: T[][]): T[] {
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

export function mergeDeepUniqObjects<T extends Record<any, any> | undefined>(
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

export class StackableStore<T> implements Readable<T> {
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
