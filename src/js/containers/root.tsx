'use strict';
/** Imports */
import * as React           from 'react';
import { Component }        from 'react';

import Avatar               from '~/components/avatar';
import CardList             from '~/components/card-list';
import Footer               from '~/components/footer';


/** Interfaces */
export interface IRootProps {
  locals: ILocals;
}


/** Constants */
const AVATAR_SIZE = 152;


/** Init */
const avatar: IResponsiveLoader = require(`images/avatar.jpg?{
  sizes: [304, 152]
}`);


/** Component */
export default class Root extends Component<IRootProps, undefined> {
  render() {
    const { links, footer } = this.props.locals;
    const { license, repo } = footer;
    const now = new Date();

    return (
      <div className='container'>
        <div className='content'>
          <div className='profile'>
            <div className='avatar-container'>
              <Avatar src={avatar.src} size={AVATAR_SIZE}/>
            </div>

            <h1 className='name'>ALEKSANDR KRIVOSHCHEKOV</h1>
            <h2 className='subtitle'>
              Fullstack developer. Native JavaScript speaker.
            </h2>
          </div>

          <div className='line' />

          <CardList links={links}/>
        </div>

        <Footer license={license} repo={repo} now={now} />
      </div>
    );
  }
}
