<nav class="header">
  <div class="container">
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

    z-index: 100;
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
