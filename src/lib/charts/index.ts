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
import defaultsDeep from 'lodash/defaultsDeep';
import * as config from '~/config';
import { Color } from '~/lib/colors';
import type { DeepPartial } from '~/lib/types';
import { roughjs, RoughCanvas, defaultOptions } from '~/lib/roughjs';

const textColor = Color.fromHEX(config.colors.grey);
const gridColor = Color.fromHEX(config.colors.grey).setA(0.6);

export abstract class Chart {
  protected _element: HTMLCanvasElement;
  protected _width: number;
  protected _height: number;

  constructor(protected _ctx: CanvasRenderingContext2D) {
    this._element = this._ctx.canvas;
    this._width = this._element.width;
    this._height = this._element.height;
  }

  resize(): void {
    const width = this._element.width;
    const height = this._element.height;

    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;

      this.update();
    }
  }

  update(): void {
    this._clean();
  }

  destroy(): void {
    this._clean();
  }

  protected _clean(): void {
    this._ctx.clearRect(0, 0, this._element.width, this._element.height);
  }
}

type TimeSeriesRequiredOptions<X, Y> = {
  scales: {
    x: {
      binsNumber?: number;
      binsWidth?: number;
    };
    y: {
      min?: number;
      max?: number;
      ticks: {
        stepSize?: number;
        callback?(value: Y, index: number): string;
      };
    };
  };
};

export type TimeSeriesOptions<X, Y> = DeepPartial<
  TimeSeriesRequiredOptions<X, Y>
>;

const defaultTimeSeriesOptions: TimeSeriesRequiredOptions<unknown, unknown> = {
  scales: {
    x: {},
    y: {
      ticks: {}
    }
  }
};

export type Series<X, Y> = {
  label: string;
  data: Array<Datapoint<X, Y>>;
  styles?: {
    fill?: string;
  };
};

export type Datapoint<X, Y> = {
  x: X;
  y: Y;
};

export class TimeSeries extends Chart {
  private _rc: RoughCanvas;
  private _options: TimeSeriesRequiredOptions<number, number>;

  constructor(
    ctx: CanvasRenderingContext2D,
    private _now: number,
    private _series: Array<Series<number, number>>,
    options?: TimeSeriesOptions<number, number>
  ) {
    super(ctx);

    this._rc = roughjs.canvas(ctx.canvas, {
      options: defaultOptions()
    });

    this._options = defaultsDeep({}, defaultTimeSeriesOptions);
    if (options !== undefined) {
      this._options = defaultsDeep(this._options, options);
    }
  }

  override update(): void {
    super.update();

    // TODO(SuperPaintman): infer values if they aren't set.
    const {
      x: { binsNumber = 10, binsWidth = 60 * 1000 },
      y: {
        min: yMin = 0,
        max: yMax = 100,
        ticks: { stepSize: yStepSize = 10, callback: yCallback }
      }
    } = this._options.scales;

    // Setup the context.
    this._ctx.font = '16px "FG Virgil"';
    this._ctx.textAlign = 'right';
    this._ctx.textBaseline = 'middle';
    this._ctx.fillStyle = textColor.toString();

    const widht = this._width;
    const height = this._height;
    const margin = 10;

    const leftPanelWidth = 92;
    const rightPanelWidth = 0;

    const textMargin = 10;

    const boxWidth = widht - margin * 2 - leftPanelWidth - rightPanelWidth;
    const boxHeight = height - margin * 2;

    const ySteps = Math.floor((yMax - yMin) / yStepSize);
    const yStepHeight = Math.floor(boxHeight / ySteps);

    // Draw the grid.
    for (let yStep = 0; yStep <= ySteps; yStep++) {
      const v = yStep * yStepSize;
      const y = margin + (boxHeight - yStepHeight * yStep);

      // Draw a tick.
      const label = yCallback !== undefined ? yCallback(v, yStep) : `${v}`;

      this._ctx.fillText(
        label,
        margin + leftPanelWidth - textMargin,
        y + 2 // Compensate the line height.
      );

      // Draw a line.
      this._rc.line(
        margin + leftPanelWidth,
        y,
        margin + leftPanelWidth + boxWidth,
        y,
        {
          seed: yStep + 1,
          stroke: gridColor.toString()
        }
      );
    }

    // Caoculate bins.
    const binStart = this._now - (this._now % binsWidth);
    const bins: Array<{ x: number; y: number; data: number[] }> = new Array(
      binsNumber + 1
    );
    for (let i = 0, ii = bins.length; i < ii; i++) {
      bins[i] = {
        x: binStart - binsWidth * (bins.length - i - 1),
        y: 0,
        data: new Array(this._series.length).fill(0)
      };
    }

    for (let i = 0, ii = this._series.length; i < ii; i++) {
      const s = this._series[i];

      for (let j = s.data.length - 1; j >= 0; j--) {
        const v = s.data[j];
        const binIDx =
          bins.length - 1 - Math.floor((binStart - v.x) / binsWidth) - 1;

        if (binIDx < 0) {
          continue;
        }

        bins[binIDx].y += v.y;
        bins[binIDx].data[i] += v.y;
      }
    }

    // Draw bars.
    const xMax = this._now;
    const xMin = this._now - binsNumber * binsWidth;
    const xRange = xMax - xMin;
    const barsDistance = Math.floor(boxWidth / (binsNumber + 1));
    const barMargin = 4;

    for (let i = bins.length - 1; i >= 0; i--) {
      const bin = bins[i];

      const center = (bin.x - xMin) / xRange;
      if (center < 0) {
        // Don't draw a last bar if it has less than a half widht.
        continue;
      }

      const xCenter = boxWidth * center;
      const yBottom = boxHeight + margin;

      let w = barsDistance - barMargin * 2;
      const h = Math.floor((boxHeight * (bin.y - yMin)) / yMax);
      if (h <= 0) {
        continue;
      }

      let x =
        margin +
        leftPanelWidth +
        xCenter -
        Math.floor(barsDistance / 2) +
        barMargin;
      let y = yBottom - h;

      const xDiffLeft = x - (margin + leftPanelWidth);
      if (xDiffLeft < 0) {
        x -= xDiffLeft;
        w += xDiffLeft;
      }

      const xDiffRight = margin + leftPanelWidth + boxWidth - x - w;
      if (xDiffRight < 0) {
        w += xDiffRight;
      }

      // Clear gird lines under a bar.
      this._ctx.clearRect(x, y, w, h);

      // Draw each section.
      for (let j = bin.data.length - 1; j >= 0; j--) {
        const v = bin.data[j];
        if (v <= 0) {
          continue;
        }

        const fill = this._series[j].styles?.fill;
        const hh = Math.floor((boxHeight * (v - yMin)) / yMax);

        this._rc.rectangle(x, y, w, hh, {
          // seed: bin.x,
          fill
        });
        y += hh;
      }
    }
  }

  updateData(
    fn: (state: { now: number; series: Array<Series<number, number>> }) => void
  ): void {
    const state = {
      now: this._now,
      series: this._series
    };
    fn(state);

    this._now = state.now;
    this._series = state.series;

    this.update();
  }

  override destroy(): void {
    super.destroy();
  }
}
