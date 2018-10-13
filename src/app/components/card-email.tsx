'use strict';
/** Imports */
import * as React             from 'react';
import { Component }          from 'react';

import { protectEmailAlways } from 'protect-email';


/** Interfaces */
export interface ICardEmailProps {
  email: string;
}


/* Helpers */
// It is necessary because React can not inject escaped email into "href" in
// correct way.
const dangerouslyContent = (href: string, title: string) => (
`<a class="card-content _clearfix -email" title="${title}" href="${href}">
  <div class="icon"></div>
  <div class="title">
    <span class="full">${title}</span>
    <span class="mobile">Email</span>
  </div>
</a>`
);


/** Component */
export default class CardEmail extends Component<ICardEmailProps, undefined> {
  render() {
    const protectedEmail = protectEmailAlways(this.props.email);
    const href = `mailto:${protectedEmail}`;

    const html = dangerouslyContent(href, protectedEmail);

    return (
      <div
        className='card-item'
        dangerouslySetInnerHTML={{ __html: html }}
        />
    );
  }
}
