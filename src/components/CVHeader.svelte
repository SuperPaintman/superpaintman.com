<script lang="ts">
  function formatPhone(value: string): string {
    // TODO
    return value;
  }
</script>

<div class="header">
  <div class="blur-box">
    <div class="blur blur-1" />
    <div class="blur blur-2" />
    <div class="blur blur-3" />
  </div>

  <div class="container">
    <div class="left-side">
      <div class="fullname">Aleksandr Krivoshchekov</div>
      <div class="current-title">Lead Sofware Engineer</div>
    </div>

    <div class="right-side">
      <table class="contact">
        <tbody>
          <tr class="contact-item email">
            <td class="type">Email</td>
            <td class="value"
              ><a href="SuperPaintmanDeveloper@gmail.com"
                >SuperPaintmanDeveloper@gmail.com</a
              ></td
            >
          </tr>
          <!-- <tr class="contact-item phone">
            <td class="type">Phone</td>
            <td class="value"
              ><a href={formatPhone('+7xxxxxxxxxx')}
                >{formatPhone('+7xxxxxxxxxx')}</a
              ></td
            >
          </tr> -->
          <tr class="contact-item website">
            <td class="type">Personal</td>
            <td class="value"
              ><a href="https://superpaintman.com">https://superpaintman.com</a
              ></td
            >
          </tr>
          <tr class="contact-item linkedin">
            <td class="type">LinkendIn</td>
            <td class="value"
              ><a href="https://linkedin.com/in/superpaintman"
                >https://linkedin.com/in/superpaintman</a
              ></td
            >
          </tr>
          <tr class="contact-item github">
            <td class="type">GitHub</td>
            <td class="value"
              ><a href="https://github.com/SuperPaintman"
                >https://github.com/SuperPaintman</a
              ></td
            >
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<style lang="stylus">
  $blur-base-size = 2px;
  $blur-radius = 192px;
  $blur-offset-top = -32px;
  $blur-offset-left = 32px;
  $blur-color-1 = rgba(#ff0044, 0.15);
  $blur-color-2 = rgba(#6b24ff, 0.15);
  $blur-color-3 = rgba(#00aaff, 0.15);

  .header {
    position: relative;

    max-width: 1200px;

    margin: auto;
  }

  .blur-box {
    position: absolute;

    top: 0;
    left: 0;
  }

  .blur {
    position: absolute;

    width: $blur-base-size;
    height: $blur-base-size;

    border-radius: 50%;
  }

  .blur-1 {
    top: $blur-offset-top;
    left: $blur-offset-left;

    background-color: $blur-color-1;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
  }

  .blur-2 {
    top: $blur-offset-top + 32px * 5;
    left: $blur-offset-left + 32px * 4;

    background-color: $blur-color-2;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
  }

  .blur-3 {
    top: $blur-offset-top + 32px * 2;
    left: $blur-offset-left + 32px * 10;

    background-color: $blur-color-3;
    box-shadow: 0 0 ($blur-radius - $blur-base-size / 2) ($blur-radius - $blur-base-size / 2) @background-color;
  }

  .container {
    display: flex;

    margin: 32px 32px;

    align-items: center;
  }

  .left-side {
    flex: 1 1 auto;
  }

  .right-side {
    flex: 0 0 auto;
  }

  .fullname {
    font-size: 42px;
    font-weight: 700;
    // line-height: 64px;
  }

  .current-title {
    margin-top: 16px;

    font-size: 32px;
    font-weight: 400;
    // line-height: 48px;
  }

  .contact {
    display: block;

    padding: 0;
    margin: 0;

    font-size: 16px;
    line-height: 32px;
    font-weight: 400;
  }

  .contact-item {
  }

  .contact-item > .type {
    padding-right: 8px;

    text-align: right;
    color: rgba(64, 64, 64, 1);
  }

  .contact-item > .value a {
    color: inherit;
    text-decoration: none;
  }
</style>
