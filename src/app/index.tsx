/*!
 * Copyright (C) 2017-2018 SuperPaintman
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
import 'whatwg-fetch';
import 'babel-polyfill';

import * as React     from 'react';
import * as ReactDOM  from 'react-dom';

import Root           from '~/containers/root';

import 'styles/style.styl';


/** Init */
const main = () => <Root locals={LOCALS}/>;


/** Boot */
if (!module.parent && typeof (global as any).document !== 'undefined') {
  ReactDOM.render(main(), document.getElementById('root'));
}


/** Export */
export default main;
