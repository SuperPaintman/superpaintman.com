<script lang="ts">
  type Splash = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    color?: number;
    opacity?: number;
  };

  export let splashes: Splash[] = [];
  export let radius: number = 0;

  function hexToRgb(v: number): string {
    const r = (v >> 16) & 0xff;
    const g = (v >> 8) & 0xff;
    const b = v & 0xff;

    return `${r}, ${g}, ${b}`;
  }

  // See: https://medium.com/airbnb-engineering/css-box-shadow-can-slow-down-scrolling-d8ea47ec6867.
  function renderSplash(elem: HTMLDivElement) {
    const width = elem.offsetWidth;
    const height = elem.offsetHeight;

    let maxX: number | undefined;
    let minX: number | undefined;
    let maxY: number | undefined;
    let minY: number | undefined;

    for (const splash of splashes) {
      if (splash.left !== undefined) {
        const v = splash.left;
        if (maxX === undefined || v > maxX) {
          maxX = v;
        }
        if (minX === undefined || v < minX) {
          minX = v;
        }
      }

      if (splash.right !== undefined) {
        const v = width - splash.right;
        if (maxX === undefined || v > maxX) {
          maxX = v;
        }
        if (minX === undefined || v < minX) {
          minX = v;
        }
      }

      if (splash.top !== undefined) {
        const v = splash.top;
        if (maxY === undefined || v > maxY) {
          maxY = v;
        }
        if (minY === undefined || v < minY) {
          minY = v;
        }
      }

      if (splash.bottom !== undefined) {
        const v = height - splash.bottom;
        if (maxY === undefined || v > maxY) {
          maxY = v;
        }
        if (minY === undefined || v < minY) {
          minY = v;
        }
      }
    }

    const canvasWidth = (maxX || 0) - (minX || 0) + radius * 2;
    const canvasHeight = (maxY || 0) - (minY || 0) + radius * 2;
    const canvasOffsetX = -1 * (radius - (minX || 0));
    const canvasOffsetY = -1 * (radius - (minY || 0));

    // Draw splashes.
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      return;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    for (const splash of splashes) {
      let x = 0;
      let y = 0;
      if (splash.left !== undefined) {
        x = splash.left;
      }
      if (splash.right !== undefined) {
        x = width - splash.right;
      }
      x += radius - (minX || 0);
      if (splash.top !== undefined) {
        y = splash.top;
      }
      if (splash.bottom !== undefined) {
        y = height - splash.bottom;
      }
      y += radius - (minY || 0);

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

      if (splash.color !== undefined) {
        const opacity = splash.opacity || 0.15;
        gradient.addColorStop(0, `rgba(${hexToRgb(splash.color)}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${hexToRgb(splash.color)}, 0)`);

        ctx.fillStyle = gradient;
      }

      ctx.moveTo(x, y);
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Insert splahes.
    const data = canvas.toDataURL();

    const div = document.createElement('div');
    div.className = elem.className;
    elem.replaceWith(div);

    const inner = document.createElement('div');
    inner.style.position = 'absolute';
    inner.style.top = `${canvasOffsetY}px`;
    inner.style.left = `${canvasOffsetX}px`;
    inner.style.width = `${canvasWidth}px`;
    inner.style.height = `${canvasHeight}px`;
    inner.style.backgroundImage = `url(${data})`;

    div.appendChild(inner);
  }

  function setupSplash(elem: HTMLDivElement) {
    renderSplash(elem);
  }
</script>

<div class="root" use:setupSplash />

<style lang="stylus">
  .root {
    position: absolute;

    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    z-index: -1;
  }
</style>
