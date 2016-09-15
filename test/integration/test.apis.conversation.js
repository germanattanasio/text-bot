/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
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
require('dotenv').config({ silent: true });

var conversation = require('../../lib/api/conversation');

describe('conversation.js', function() {
  this.timeout(5000);
  this.slow(3000);
  it('should return geo location for Miami', function(done) {
    var params = {
      input : {
        text: 'Hi this is a test'
      }
    }
    conversation.message(params, done);
  });

});
