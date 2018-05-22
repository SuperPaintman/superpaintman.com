'use strict';
/** Imports */
import * as React           from 'react';
import { Component }        from 'react';

import CardItem             from '~/components/card-item';
import CardEmail            from '~/components/card-email';

import map                  from '~/utils/map';


/** Interfaces */
export interface ICardListProps {
  email: string;
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
    const { email, links } = this.props;
    return (
      <div className='card-list'>
        {map(links, (link, key) => <CardItem key={key} name={key} url={link.url} title={link.title} username={link.name}/>)}
        <CardEmail email={email} />
      </div>
    );
  }
}
