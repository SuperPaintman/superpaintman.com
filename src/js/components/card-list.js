'use strict';
/** Imports */
import React, { Component } from 'react';

import CardItem             from './card-item';

import map                  from '../utils/map';


export default class CardList extends Component {
  render() {
    const { links } = this.props;

    return (
      <div className="card-list _clearfix">
        {map(links, (link, key) => <CardItem key={key} name={key} url={link.url} username={link.name}/>)}
      </div>
    );
  }
}
