'use strict';
/** Imports */
import React, { Component } from 'react';


export default class Footer extends Component {
  render() {
    const { license, repo } = this.props;

    const dateNow = new Date().getFullYear();

    return (
      <footer className="footer">
        <div className="wrapper">
          <div className="copyright">© {dateNow === 2017 ? dateNow : '2017-' + dateNow} SuperPaintman</div>
          <div className="license">
            <span>Licensed under the </span>
            <a title={license.text} href={license.url} target="_blank">
              {license.text}
            </a>
          </div>
          <div className="repo">
            <span>Found a bug? Fork this site on </span>
            <a title={repo.name} href={repo.url} target="_blank">
              {repo.name}
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
