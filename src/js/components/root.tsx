'use strict';
/** Imports */
import * as React           from 'react';
import { Component }        from 'react';

import CardList             from './card-list';
import Footer               from './footer';


/** Interfaces */
export interface IRootProps {
  locals: ILocals;
}


/** Component */
export default class Root extends Component<IRootProps, undefined> {
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
