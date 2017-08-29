'use strict';
/** Imports */
import * as React           from 'react';
import { Component }        from 'react';

import CardItem             from './card-item';

import map                  from '../utils/map';


/** Interfaces */
export interface ICardListProps {
  links: {
    [key: string]: {
      name: string;
      url:  string;
    };
  };
}


/** Component */
export default class CardList extends Component<ICardListProps, undefined> {
  render() {
    const { links } = this.props;
    return (
      <div className='card-list'>
        {map(links, (link, key) => <CardItem key={key} name={key} url={link.url} title={link.title} username={link.name}/>)}
      </div>
    );
  }
}
