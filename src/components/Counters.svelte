<!--!
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
-->
<script lang="ts">
  export let yandex: number;
  export let google: string;

  function yandexMetrika(id: number) {
    return `
      ${'<'}script type="text/javascript"${'>'}
        (function (d, w, c) {
          (w[c] = w[c] || []).push(function() {
            try {
              w.yaCounter${id} = new Ya.Metrika({
                id:${id},
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                trackHash:true
              });
            } catch(e) { }
          });

          var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://mc.yandex.ru/metrika/watch.js";

          if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
          } else { f(); }
        })(document, window, "yandex_metrika_callbacks");
      ${'<'}/script${'>'}
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/${id}"
            style="position:absolute; left:-9999px;"
            alt=""
          />
        </div>
      </noscript>
    `;
  }

  function googleAnalytics(id: string) {
    return `
      ${'<'}script type="text/javascript"${'>'}
        (function (d, w) {
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', '${id}', 'auto');
          ga('send', 'pageview');
        })(document, window);
      ${'<'}/script${'>'}
    `;
  }
</script>

<svelte:head>
  {#if yandex}
    {@html yandexMetrika(yandex)}
  {/if}

  {#if google}
    {@html googleAnalytics(google)}
  {/if}
</svelte:head>
