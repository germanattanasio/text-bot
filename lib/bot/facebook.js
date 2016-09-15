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

var debug = require('debug')('bot:channel:facebook');
var Botkit = require('botkit');
var facebookBot = Botkit.facebookbot({
  log: false,
  access_token: process.env.FACEBOOK_ACCESS_TOKEN,
  verify_token: process.env.FACEBOOK_VERIFY_TOKEN
});

module.exports = function (app, controller) {
  // spawn a facebook bot instance
  var bot = facebookBot.spawn({});
  // hook the bot to the web app
  facebookBot.createWebhookEndpoints(app, bot);
  debug('facebook initialized');

  facebookBot.hears('(.*)', 'message_received', function (bot, message) {
    debug('message: %s', JSON.stringify(message));
    controller.processMessage(message, function(err, response) {

      if (err) {
        bot.reply(message, 'There was a problem processing your message, please try again');
      } else {
        var responseText = "";
        for (var item in response.output.text) {
        			if (response.output.text[item].length !== 0) {
        					responseText = responseText + response.output.text[item] + "\n";
        			}
        }
        bot.reply(message, responseText);
      }
    });
  });
}
