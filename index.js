/*
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
/** Requires */
var http          = require('http');

var finalhandler  = require('finalhandler');
var serveStatic   = require('serve-static');

/** Constants */
var PORT = process.env.NODE_PORT
         ? parseInt(process.env.NODE_PORT, 10)
         : 3000;


var serve = serveStatic('public');

// Create server 
var server = http.createServer(function (req, res) {
  serve(req, res, finalhandler(req, res));
});

// Listen 
server.listen(PORT, function () {
  console.log('Dev server listen on port ' + PORT + '!');
});
