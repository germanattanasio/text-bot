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

var extend = require('extend');
var cloudant = require('cloudant')(process.env.CLOUDANT_URL);
var dbname = 'botdb';
var botdb = null;

try{
  botdb = cloudant.db.create(dbname);
  if (botdb != null){
    botdb = cloudant.db.use(dbname);
  }
}catch(e){
  botdb = cloudant.db.use(dbname);
}

module.exports = {
  /**
   * Returns an element by id or undefined if it doesn't exists
   * @param  {[type]}   params._id The user id
   * @param  {Function} callback The callback
   * @return {void}
   */
  get: function(params, callback) {
    botdb.get(params, function(err, response) {
      if (err) {
        if (err.error !== 'not_found') {
          return callback(err);
        } else {
          return callback(null);
        }
      } else {
        return callback(null, response);
      }
    });
  },
  /**
   * Inserts an element in the database
   * @param  {[type]}   params._id The user id
   * @param  {Function} callback The callback
   * @return {void}
   */
  put: function(params, callback) {
    botdb.insert(params, callback);
  }
};
