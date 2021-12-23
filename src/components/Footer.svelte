<script lang="ts">
  const startYear = 2017;
  const currentYear = new Date().getFullYear();
  const yearsRange =
    currentYear === startYear
      ? '' + `${startYear}`
      : `${startYear}-${currentYear}`;

  const license = {
    name: 'Apache License, Version 2.0',
    url: 'https://raw.githubusercontent.com/SuperPaintman/superpaintman.com/master/LICENSE'
  };

  const repo = {
    name: 'SuperPaintman/superpaintman.com',
    url: 'https://github.com/SuperPaintman/superpaintman.com'
  };
</script>

<div class="footer">
  <div class="copyright">
    © {yearsRange} Aleksandr Krivoshchekov (@SuperPaintman)
  </div>
  <div class="license">
    Licensed under the <a
      title={license.name}
      href={license.url}
      target="_blank">{license.name}</a
    >
  </div>
  <div class="repo">
    Found a bug? Fork this site on <a
      title={repo.name}
      href={repo.url}
      target="_blank">GitHub</a
    >
  </div>
</div>

<style lang="stylus">
  .footer {
    margin: 48px auto;

    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    text-align: center;
    line-height: 20px;
  }

  .footer a {
    // TODO
    color: inherit;

    text-decoration: none;
  }
</style>
