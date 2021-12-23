<nav class="header">
  <div class="container">
    <div class="blur-box">
      <div class="blur blur-1" />
      <div class="blur blur-2" />
      <div class="blur blur-3" />
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
  $blur-base-size = 2px;
  $blur-radius = 192px;
  $blur-offset-top = 0px;
  $blur-offset-left = 48px;
  $blur-color-1 = rgba(#ff0044, 0.15);
  $blur-color-2 = rgba(#6b24ff, 0.15);
  $blur-color-3 = rgba(#00aaff, 0.15);

  .container {
    position: relative;
    display: flex;

    max-width: 1200px;

    margin: 16px auto;
    padding: 0 32px;

    box-sizing: border-box;
  }

  .blur-box {
    position: absolute;

    top: $blur-offset-top;
    left: $blur-offset-left;

    z-index: -1;
  }

  .blur {
    position: absolute;

    width: $blur-base-size;
    height: $blur-base-size;

    border-radius: 50%;
  }

  .blur-1 {
    top: 0;
    left: 0;

    background-color: $blur-color-1;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
  }

  .blur-2 {
    top: 32px * 5;
    left: 32px * 4;

    background-color: $blur-color-2;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
  }

  .blur-3 {
    top: 32px * 2;
    left: 32px * 10;

    background-color: $blur-color-3;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
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
