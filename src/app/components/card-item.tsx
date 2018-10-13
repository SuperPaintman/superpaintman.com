'use strict';
/** Imports */
import * as React    from 'react';
import { Component } from 'react';


/** Interfaces */
export interface ICardItemProps {
  title:      string;
  name:       string;
  username:   string;
  url:        string;
}


/** Component */
export default class CardItem extends Component<ICardItemProps, undefined> {
  render() {
    const { name, username, url, title } = this.props;

    return (
      <div className='card-item'>
        <link rel='prefetch' href={url}/>
        <a className={['card-content', '_clearfix', `-${name}`].join(' ')} title={username} href={url}>
          <div className='icon'></div>
          <div className='title'>{title}</div>
        </a>
      </div>
    );
  }
}
