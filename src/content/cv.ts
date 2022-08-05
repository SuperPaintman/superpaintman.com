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

export type PositionDate = {
  month: number;
  year: number;
};

export type Position = {
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

export const description = $$markdown$$(`
Forward-thinking lead software engineer with over 5 years of experience designing and building large-scale distributed systems in dynamic environments. Focused on developing efficient and clear solutions. Led successful migration of Yandex.Eats' catalog and search page to microservices which provided 99,9% uptime and ability to serve 10x traffic from the main screen.

A program committee member of [Highload++](http://highload.co) - the largest (2000+ attendees) annual tech conference in Eastern Europe.
`);

export const seoDescription = $$trim$$(`
Forward-thinking lead software engineer with over 5 years of experience designing and building large-scale distributed systems in dynamic environments. Focused on developing efficient and clear solutions. Led successful migration of Yandex.Eats' catalog and search page to microservices which provided 99,9% uptime and ability to serve 10x traffic from the main screen.

A program committee member of Highload++ - the largest (2000+ attendees) annual tech conference in Eastern Europe.
`);

export const positions: Position[] = [
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
    description: $$markdown$$(`
- Design, develop, and support high performance distributed system that serves Yandex.Eats' main screen.
- Lead and mentor an engineering team.
- Work closely with other engineering teams and stakeholders to collect requirements and describe technical designs.
- Define and prioritize projects and tasks.
- Review code and architecture of new services.

**Stack**:
Go, PostgreSQL, Docker, Redis, Prometheus, Kafka-like event sourcing solution.
    `)
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
    description: $$markdown$$(`
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
    `)
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
    description: $$markdown$$(`
[Highload++](http://highload.co) (http://highload.co) and [RIT++](http://ritfest.ru/) (http://ritfest.ru/) are the largest (2000+ attendees) annual tech conferences in Eastern Europe.

**Link**: https://www.highload.ru/moscow/2021/committee (Александр Кривощеков)
    `)
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
    description: $$markdown$$(`
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
    `)
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

export const languages = [
  {
    name: 'English',
    level: 'Professional working proficiency'
  },
  {
    name: 'Russian',
    level: 'Excellent, Native speaker'
  }
];

export const skills = [
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
