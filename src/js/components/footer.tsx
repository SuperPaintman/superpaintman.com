'use strict';
/** Imports */
import * as React    from 'react';
import { Component } from 'react';


/** Interfaces */
export interface IFooterProps {
  repo: {
    name:       string;
    url:        string;
  };
  license: {
    text:       string;
    url:        string;
  };
  now?: Date;
}


/** Component */
export default class Footer extends Component<IFooterProps, undefined> {
  render() {
    const {
      license,
      repo,
      now = new Date()
    } = this.props;

    const dateNow = now.getFullYear();

    return (
      <footer className='footer'>
        <div className='wrapper'>
          <div className='copyright'>© {dateNow === 2017 ? dateNow : '2017-' + dateNow} SuperPaintman</div>
          <div className='license'>
            <span>Licensed under the </span>
            <a title={license.text} href={license.url} target='_blank'>
              {license.text}
            </a>
          </div>
          <div className='repo'>
            <span>Found a bug? Fork this site on </span>
            <a title={repo.name} href={repo.url} target='_blank'>
              {repo.name}
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
