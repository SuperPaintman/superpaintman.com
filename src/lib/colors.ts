'use strict';

export class Color {
  constructor(
    private _r: number,
    private _g: number,
    private _b: number,
    private _a: number = 1
  ) {}

  setR(r: number): this {
    this._r = r;
    return this;
  }

  setG(g: number): this {
    this._g = g;
    return this;
  }

  setB(b: number): this {
    this._b = b;
    return this;
  }

  setA(a: number): this {
    this._a = a;
    return this;
  }

  toString(): string {
    return this._a === 1
      ? `rgb(${this._r}, ${this._g}, ${this._b})`
      : `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
  }

  toHEX(): number {
    return (this._r << 16) | (this._g << 8) | this._b;
  }

  static fromRGB(r: number, g: number, b: number): Color {
    return new Color(r, g, b);
  }

  static fromRGBA(r: number, g: number, b: number, a?: number): Color {
    return new Color(r, g, b, a);
  }

  static fromHEX(hex: number): Color {
    const r = (hex >> 16) & 0xff;
    const g = (hex >> 8) & 0xff;
    const b = hex & 0xff;

    return new Color(r, g, b);
  }
}
