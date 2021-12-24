'use strict';

import { getContext, setContext } from 'svelte';
import type { Readable, Subscriber, Unsubscriber } from 'svelte/store';

const SEO = {};

export type Unset = () => void;

class StackableStore<T> implements Readable<T> {
  private _values: Array<{ value: T }> = [];
  private _subscribers: Array<Subscriber<T>> = [];

  constructor(private _default: T) {}

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
    const lastValue =
      this._values.length > 0
        ? this._values[this._values.length - 1]
        : undefined;

    if (lastValue !== undefined) {
      console.log(lastValue.value);
      subscriber(lastValue.value);
    } else {
      subscriber(this._default);
    }
  }

  private _notifyAll(): void {
    for (const subscriber of this._subscribers) {
      this._notify(subscriber);
    }
  }
}

export class SeoContext {
  private _title: StackableStore<string | undefined>;
  private _description: StackableStore<string | undefined>;

  constructor() {
    this._title = new StackableStore<string | undefined>(undefined);
    this._description = new StackableStore<string | undefined>(undefined);
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
}

export const noopUnset: Unset = () => undefined;

const noopContext = new SeoContext();

export function getSeoContext(): SeoContext {
  return getContext(SEO) || noopContext;
}

export function setSeoContext(): void {
  setContext(SEO, new SeoContext());
}
