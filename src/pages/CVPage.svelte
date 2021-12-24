<script lang="ts">
  import { marked } from 'marked';
  import CVHeader from '~/components/CVHeader.svelte';

  const escapeTest = /[&<>"']/;
  const escapeReplace = /[&<>"']/g;
  const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  const escapeReplacements: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  const getEscapeReplacement = (ch: string): string | undefined =>
    escapeReplacements[ch];
  function escape(html: string, encode?: boolean): string {
    if (encode) {
      if (escapeTest.test(html)) {
        return html.replace(escapeReplace, getEscapeReplacement as any);
      }
    } else {
      if (escapeTestNoEncode.test(html)) {
        return html.replace(escapeReplaceNoEncode, getEscapeReplacement as any);
      }
    }

    return html;
  }

  const nonWordAndColonTest = /[^\w:]/g;
  const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
  function cleanUrl(
    sanitize: boolean | undefined,
    base: string | undefined,
    href: string
  ): string | null {
    if (sanitize) {
      let prot;
      try {
        prot = decodeURIComponent(unescape(href))
          .replace(nonWordAndColonTest, '')
          .toLowerCase();
      } catch (e) {
        return null;
      }
      if (
        prot.indexOf('javascript:') === 0 ||
        prot.indexOf('vbscript:') === 0 ||
        prot.indexOf('data:') === 0
      ) {
        return null;
      }
    }
    if (base && !originIndependentUrl.test(href)) {
      href = resolveUrl(base, href);
    }
    try {
      href = encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
      return null;
    }
    return href;
  }

  const baseUrls: { [key: string]: string } = {};
  const justDomain = /^[^:]+:\/*[^/]*$/;
  const protocol = /^([^:]+:)[\s\S]*$/;
  const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
  function resolveUrl(base: string, href: string): string {
    if (!baseUrls[' ' + base]) {
      // we can ignore everything in base after the last slash of its path component,
      // but we might need to add _that_
      // https://tools.ietf.org/html/rfc3986#section-3
      if (justDomain.test(base)) {
        baseUrls[' ' + base] = base + '/';
      } else {
        baseUrls[' ' + base] = rtrim(base, '/', true);
      }
    }
    base = baseUrls[' ' + base];
    const relativeBase = base.indexOf(':') === -1;

    if (href.substring(0, 2) === '//') {
      if (relativeBase) {
        return href;
      }
      return base.replace(protocol, '$1') + href;
    } else if (href.charAt(0) === '/') {
      if (relativeBase) {
        return href;
      }
      return base.replace(domain, '$1') + href;
    } else {
      return base + href;
    }
  }

  function rtrim(str: string, c: string, invert: boolean): string {
    const l = str.length;
    if (l === 0) {
      return '';
    }

    // Length of suffix matching the invert condition.
    let suffLen = 0;

    // Step left until we fail to match the invert condition.
    while (suffLen < l) {
      const currChar = str.charAt(l - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }

    return str.substr(0, l - suffLen);
  }

  class CustomRenderer<T = never> extends marked.Renderer<T> {
    link(href: string | null, title: string | null, text: string): string | T {
      if (href !== null) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
      }
      if (href === null) {
        return text;
      }
      let out = '<a href="' + escape(href) + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += ' target="_blank">' + text + '</a>';
      return out;
    }
  }

  const markdownRenderer = new CustomRenderer();

  function renderMarkdown(source: string): string {
    return marked(source, {
      gfm: true,
      renderer: markdownRenderer
    });
  }

  type PositionDate = {
    month: number;
    year: number;
  };

  type Position = {
    title: string;
    partTime?: boolean;
    progress?: boolean;
    company: {
      name: string;
      url?: string;
    };
    location?: string;
    date: {
      start: PositionDate;
      end?: PositionDate;
    };
    description?: string;
  };

  const months: { [key: number]: string } = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  };
  function formatDateRange(start: PositionDate, end?: PositionDate): string {
    let res = months[start.month] + ' ' + start.year;
    res += ' – ';

    if (end) {
      res += months[end.month] + ' ' + end.year;
    } else {
      res += 'Present';
    }

    return res;
  }

  function formatDuration(start: PositionDate, end: PositionDate): string {
    const startMonts = start.year * 12 + start.month;
    const endMonts = end.year * 12 + end.month;

    const duration = endMonts - startMonts + 1;

    const years = Math.floor(duration / 12);
    const months = duration % 12;

    let res = '';
    if (years > 0) {
      res += years + ' yr';
      if (years > 1) {
        res += 's';
      }
    }

    if (months > 0) {
      if (res.length > 0) {
        res += ' ';
      }

      res += months + ' mo';
      if (months > 1) {
        res += 's';
      }
    }

    return res;
  }

  const description = `
Forward-thinking lead software engineer with over 5 years of experience designing and building large-scale distributed systems in dynamic environments. Focused on developing efficient and clear solutions. Led successful migration of Yandex.Eats' catalog and search page to microservices which provided 99,9% uptime and ability to serve 10x traffic from the main screen.

A program committee member of [Highload++](http://highload.co) - the largest (2000+ attendees) annual tech conference in Eastern Europe.
  `.trim();

  const positions: Position[] = [
    {
      title: 'Lead Software Engineer',
      company: {
        name: 'Yandex',
        url: 'https://www.linkedin.com/company/yandex'
      },
      progress: true,
      location: 'Moscow, Russia',
      date: {
        start: { month: 4, year: 2019 }
      },
      description: `
- Design, develop, and support high performance distributed system that serves Yandex.Eats' main screen.
- Lead and mentor an engineering team.
- Work closely with other engineering teams and stakeholders to collect requirements and describe technical designs.
- Define and prioritize projects and tasks.
- Review code and architecture of new services.

**Stack**:
Go, PostgreSQL, Docker, Redis, Prometheus, Kafka-like event sourcing solution.
      `.trim()
    },
    {
      title: 'Software Engineer',
      company: {
        name: 'Yandex',
        url: 'https://www.linkedin.com/company/yandex'
      },
      location: 'Moscow, Russia',
      date: {
        start: { month: 6, year: 2018 },
        end: { month: 4, year: 2019 }
      },
      description: `
- Developed restaurant page, cart, and checkout page components of the web application.
- Designed and implemented reusable UI components.
- Reviewed code and provided helpful feedback.
- Updated, refactored, covered with unit tests, and wrote documentation for common payment page and notification service.
- Improved an internal toolchain.

**Key Achievements**:
- Created an automated system and toolchain to review and check API specifications which standardized the API change process. The system was used by all teams.
- Improved and documented company's API design guide.
- Documented TypeScript and JavaScript code style guide.

**Stack**:
TypeScript, JavaScript, Node.js, React, MobX, InfluxDB.
      `.trim()
    },
    {
      title: 'Program Committee Member',
      partTime: true,
      company: {
        name: 'Ontico',
        url: 'https://www.linkedin.com/company/ontico'
      },
      location: 'Moscow, Russia',
      date: {
        start: { month: 9, year: 2021 }
      },
      description: `
[Highload++](http://highload.co) (http://highload.co) and [RIT++](http://ritfest.ru/) (http://ritfest.ru/) are the largest (2000+ attendees) annual tech conferences in Eastern Europe.

**Link**: https://www.highload.ru/moscow/2021/committee (Александр Кривощеков)
      `.trim()
    },
    {
      title: 'Senior Software Engineer',
      company: {
        name: 'Exquance Software',
        url: 'https://www.linkedin.com/company/exquance-software'
      },
      location: 'Saint Petersburg, Russia',
      date: {
        start: { month: 3, year: 2016 },
        end: { month: 6, year: 2018 }
      },
      description: `
- Designed, developed, and supported core services: license management system, reporting system, billing system, and web dashboard.
- Worked closely with stakeholders to translate requirements into tasks and projects.
- Mentored and managed junior web developers.
- Designed and implemented a single sign-on scheme and SDK for all company's services.

**Key Achievements**:
- Set up CI/CD pipelines for all front-end and back-end services, reducing time to build and release by 80%.
- License management system eliminated the routine with setting up new companies, issuing licenses, and permissions.
- Documented system design guidelines, code style guide, and API design guide.

**Stack**:
TypeScript, JavaScript, Node.js, C, AngularJS 1.5, Docker, MongoDB, PostgreSQL, RabbitMQ, Redis.
      `.trim()
    },
    {
      title: 'Web Developer',
      company: { name: 'Freelance' },
      location: 'Remote',
      date: {
        start: { month: 1, year: 2012 },
        end: { month: 3, year: 2016 }
      }
    }
  ];

  const languages = [
    {
      name: 'English',
      level: 'Professional working proficiency'
    },
    {
      name: 'Russian',
      level: 'Excellent, Native speaker'
    }
  ];

  const skills = [
    'Distributed Systems',
    'Software Architecture',
    'Team Leadership',
    'Go',
    'JavaScript',
    'TypeScript',
    'C',
    // 'Crystal',
    'Node.js',
    'React',
    'Angular',
    'AngularJS',
    'Docker',
    'MySQL',
    'PostgreSQL',
    'Redis',
    'MongoDB',
    'RabbitMQ',
    'Apache Kafka',
    'Linux',
    'Nginx',
    'SQL',
    'Git',
    'AMQP',
    'Microservices',
    'SOA',
    'Software Engineering',
    'Scalability',
    'Security',
    // 'System Architecture',
    'Unit Testing',
    'Computer Science',
    // 'Application Development',
    'Team Management'
    // 'Data Storage',
    // 'Web Application Development'
    // 'Open Source',
  ];
</script>

<div class="root">
  <CVHeader />

  <div class="divider" />

  <div id="bio" class="section">
    <div class="container">
      <div class="left-side">
        <h3 class="section-title">Bio</h3>
      </div>

      <div class="right-side">
        <div class="description">
          {@html renderMarkdown(description)}
        </div>
      </div>
    </div>
  </div>

  <div class="divider" />

  <div id="experience" class="section">
    <div class="container">
      <div class="left-side">
        <h3 class="section-title">Experience</h3>
      </div>

      <div class="right-side">
        {#each positions as { title, company, location, date, progress, description }}
          <div class="position">
            <div class="dot" />
            {#if progress}
              <div class="line" />
            {/if}
            <h4 class="title">{title}</h4>
            <div class="info">
              <span class="company">
                {#if company.url}<a href={company.url} target="_blank"
                    >{company.name}</a
                  >{:else}{company.name}{/if}</span
              >{#if location},{/if}
              {#if location}
                <span class="location">{location}</span>
              {/if}
            </div>
            <div class="date">
              <span class="range">{formatDateRange(date.start, date.end)}</span>
              {#if date.end}
                <span class="duration"
                  >{formatDuration(date.start, date.end)}</span
                >
              {/if}
            </div>

            {#if description}
              <div class="description">
                {@html renderMarkdown(description)}
              </div>
            {/if}

            <div class="position-divider" />
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="divider" />

  <div id="languages" class="section">
    <div class="container">
      <div class="left-side">
        <h3 class="section-title">Languages</h3>
      </div>

      <div class="right-side">
        <ul class="languages">
          {#each languages as { name, level } (name)}
            <li class="language">
              <span class="name">{name}</span>
              <span class="level">({level})</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <div class="divider" />

  <div id="skills" class="section">
    <div class="container">
      <div class="left-side">
        <h3 class="section-title">Skills</h3>
      </div>

      <div class="right-side">
        <ul class="skills">
          {#each skills as skill (skill)}
            <li class="skill">{skill}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <div class="divider" />
</div>

<style lang="stylus">
  $divider-color = rgba(0, 0, 0, 0.1);
  $position-dot-color = rgba(200, 200, 200, 1);
  $position-dot-color = rgba(160, 160, 160, 1);
  $position-gap-height = 58px;
  $left-side-width = 128px + 32px;

  .divider {
    margin: 32px 0;

    border-bottom: 1px solid $divider-color;
  }

  .section {
    max-width: 1200px;

    margin: auto;
  }

  .section .left-side {
    font-size: 1em;
    line-height: 1.5;
  }

  .section .right-side {
    font-size: 1em;
    line-height: 1.5;
  }

  .section .description {
    :global {
      p {
        margin: 0;
        margin-bottom: 16px;
      }

      p:last-child {
        margin-bottom: 0;
      }

      a {
        color: inherit;

        text-decoration: none;
      }

      ul {
        padding: 0;
        margin: 0;
        margin-bottom: 16px;

        list-style: none;
      }

      ul:last-child {
        margin-bottom: 0;
      }

      li {
        position: relative;

        margin-left: 32px;
        margin-bottom: 6px;
      }

      li:last-child {
        margin-bottom: 0;
      }

      li:before {
        content: "∙";

        position: absolute;

        width: 32px;

        top: -1px;
        left: -32px;

        text-align: center;
      }
    }
  }

  .container {
    display: flex;

    margin: 32px 32px;
  }

  .left-side {
    flex: 0 0 auto;

    width: $left-side-width;
  }

  .right-side {
    flex: 0 1 auto;

    width: 100%;

    margin-right: $left-side-width;
  }

  .section-title {
    margin: 0;
    margin-right: 48px;
    padding: 0;

    font-size: 16px;
    font-weight: 700;
    text-align: right;
  }

  .skills {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    width: 100%;

    padding: 0;
    margin: 0;
    margin-bottom: -8px;

    list-style: none;
  }

  .skills > .skill {
    display: block;

    flex: 0 0 auto;

    // width: 33.33%;
    width: 25%;

    padding-right: 16px;
    margin-bottom: 8px;

    box-sizing: border-box;
  }

  .languages {
    padding: 0;
    margin: 0;

    list-style: none;
  }

  .language {
    margin-bottom: 8px;
  }

  .language:last-child {
    margin-bottom: 0;
  }

  .language > .name {
    margin-right: 8px;
  }

  .position {
    position: relative;

    margin-bottom: $position-gap-height;
  }

  .position:last-child {
    margin-bottom: 0;
  }

  .position .dot {
    position: absolute;

    width: 7px;
    height: @width;

    top: 12px - floor(@width / 2) - 1px;
    left: -24px - floor(@width / 2) - 1px;

    // background: $position-dot-color;
    background: #ffffff;

    border: 1px solid $position-dot-color;
    border-radius: 50%;

    z-index: 1;
  }

  .position .line {
    position: absolute;

    width: 1px;
    height: "calc(100% + %s)" % ($position-gap-height + 5px);

    top: 12px;
    left: -24px;

    background: $position-dot-color;
  }

  .position .title {
    padding: 0;
    margin: 0;

    // font-size: 18px;
    font-size: 22px;
    font-weight: 400;
    line-height: 24px;
  }

  .position .info {
    margin-top: 6px;

    line-height: 24px;
  }

  .position .info a {
    color: inherit;
    text-decoration: none;
  }

  .position .date {
    margin-top: 4px;
    margin-bottom: 16px;

    // font-size: 14px;
    font-weight: 300;
    line-height: 24px;
  }

  .position .date:last-child {
    margin-bottom: 0;
  }

  .position .date .duration:before {
    content: "∙";

    position: relative;

    margin: 0 8px;

    top: -2px;

    font-size: 12px;

    color: rgba(0, 0, 0, 0.5);
  }

  .position .position-divider {
    position: absolute;

    width: 100%;
    height: $position-gap-height;

    bottom: -1 * @height + 2px;

    color: $position-dot-color;
    font-size: 12px;
    text-align: center;
    line-height: @height;
  }

  .position:last-child .position-divider {
    display: none;
  }

  .position .position-divider:before {
    content: "∙ ∙ ∙";
  }
</style>
