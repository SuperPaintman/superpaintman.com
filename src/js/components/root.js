'use strict';
/** Imports */
import React, { Component } from 'react';

import CardList             from './card-list';
import Footer               from './footer';


export default class Root extends Component {
  render() {
    const { links, footer } = this.props.locals;
    const { license, repo } = footer;

    return (
      <div>
        <CardList links={links}/>
        <Footer license={license} repo={repo}/>
      </div>
    );
  }
}
