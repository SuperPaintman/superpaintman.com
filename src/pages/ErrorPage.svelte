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
  import { SeoRobots } from '~/components/seo';

  export let code: number;

  const messages: { [code: number]: string | undefined } = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    408: 'Request Timeout',
    410: 'Gone',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    426: 'Upgrade Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required'
  };

  $: message = messages[code];
</script>

<SeoRobots noIndex />

<div class="root">
  <div class="container">
    <div class="code">{code}</div>

    {#if message}
      <div class="message">{message}</div>
    {/if}
  </div>
</div>

<style lang="stylus">
  $header-height = 74px;
  $footer-height = 156px;

  .root {}

  .container {
    display: flex;

    max-width: 1200px;
    min-height: "calc(100vh - %s)" % ($header-height + $footer-height);

    margin: auto;
    padding: 32px;

    text-align: center;

    box-sizing: border-box;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 512px) {
      padding: 32px 16px;
    }
  }

  .code {
    font-size: 128px;
  }

  .message {
    font-size: 32px;
    font-weight: 300;
  }
</style>
