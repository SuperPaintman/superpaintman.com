'use strict';
/** Imports */
import * as React    from 'react';
import { Component } from 'react';


/** Interfaces */
export interface ICardItemProps {
  name:       string;
  username:   string;
  url:        string;
}


/** Component */
export default class CardItem extends Component<ICardItemProps, undefined> {
  render() {
    const { name, username, url } = this.props;

    return (
      <div className='card-item'>
        <link rel='prefetch' href={url}/>
        <a className={['content', `-${name}`].join(' ')} title={username} href={url}>
          <div className='icon'></div>
        </a>
      </div>
    );
  }
}
