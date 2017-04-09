'use strict';
/** Imports */
import React, { Component } from 'react';


export default class CardItem extends Component {
  render() {
    const { name, username, url } = this.props;

    return (
      <div className="card-item">
        <link rel="prefetch" href={url}/>
        <a className={['content', `-${name}`].join(' ')} title={username} href={url}>
          <div className="icon"></div>
        </a>
      </div>
    );
  }
}
