/*!
 * Copyright (C) 2017 SuperPaintman
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';

import 'styles/style.styl';


/** Helpers */
function map(obj, cb) {
  return Object.keys(obj).map((key) => cb(obj[key], key, obj));
}

export class Footer extends React.Component {
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

export class CardItem extends React.Component {
  render() {
    const { name, username, url } = this.props;

    return (
      <div className="card-item">
        <link rel="prefetch" href={url}/>
        <a className={['content', '-' + name].join(' ')} title={username} href={url}>
          <div className="icon"></div>
        </a>
      </div>
    );
  }
}

export class CardList extends React.Component {
  render() {
    const { links } = this.props;

    return (
      <div className="card-list _clearfix">{
        map(links, (link, key) => <CardItem key={key} name={key} url={link.url} username={link.name}/>)
      }</div>
    );
  }
}

export default class Root extends React.Component {
  render() {
    const { links, footer } = LOCALS;
    const { license, repo } = footer;

    return (
      <div>
        <CardList links={links}/>
        <Footer license={license} repo={repo}/>
      </div>
    );
  }
}


/** Boot */
if (!module.parent && typeof global.document !== 'undefined') {
  ReactDOM.render(
    <Root/>,
    document.getElementById('root')
  );
}

