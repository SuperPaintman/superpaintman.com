<script lang="ts">
  import Splash from '~/components/Splash.svelte';

  const splashOpacity = 0.15;
  const splashRadius = 192 * 1.5;
  const splashes = [
    {
      top: 0,
      left: 48,
      color: 0xff0044,
      opacity: splashOpacity
    },
    {
      top: 0 + 32 * 5,
      left: 48 + 32 * 4,
      color: 0x6b24ff,
      opacity: splashOpacity
    },
    {
      top: 0 + 32 * 2,
      left: 48 + 32 * 10,
      color: 0x00aaff,
      opacity: splashOpacity
    }
  ];
</script>

<nav class="header">
  <div class="container">
    <div class="splash">
      <Splash {splashes} radius={splashRadius} />
    </div>

    <a class="logo" href="/">
      <div class="icon">AK</div>
    </a>

    <ol class="links">
      <li class="link"><a href="/">Links</a></li>
      <li class="link"><a href="/blog">Blog</a></li>
      <li class="link"><a href="/cv">CV</a></li>
    </ol>
  </div>
</nav>

<style lang="stylus">
  .container {
    position: relative;
    display: flex;

    max-width: 1200px;

    margin: 16px auto;
    padding: 0 32px;

    box-sizing: border-box;
  }

  .splash {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: -1;
  }

  .logo {
    display: block;

    color: inherit;
    text-decoration: none;
  }

  .icon {
    flex: 0 0 auto;

    width: 42px;
    height: 42px;

    margin-right: 16px;

    border-radius: 4px;

    background: #000000;

    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    line-height: @height;

    user-select: none;
  }

  .links {
    flex: 0 1 auto;

    display: flex;

    margin: 0;
    margin-left: auto;
    margin-right: -22px;
    padding: 0;

    list-style: none;
  }

  .link {
    margin: 0;
    padding: 13px 22px;

    border-radius: 4px;

    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
  }

  .links a {
    color: inherit;
    text-decoration: none;
  }
</style>
