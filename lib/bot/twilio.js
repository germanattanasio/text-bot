
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

var Botkit = require('botkit');
var debug = require('debug')('bot:channel:twilio');

// Facebook Controller & Bot
var twilioBot = Botkit.twilioipmbot({
  log: false,
  TWILIO_IPM_SERVICE_SID: process.env.TWILIO_IPM_SERVICE_SID,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY: process.env.TWILIO_API_KEY,
  TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
  identity: process.env.BOT_NAME,
  autojoin: true
});

module.exports = function (app, controller) {
  var bot = twilioBot.spawn({});
  twilioBot.createWebhookEndpoints(app, bot);
  debug('twilio initialized');

  twilioBot.hears('(.*)', 'message_received', function (bot, message) {
    debug('message: %s', JSON.stringify(message));
    controller.processMessage(message, function(err, response) {
      if (err) {
        bot.reply(message, 'There was a problem processing your message, please try again');
      } else {
        bot.reply(message, response.text);
      }
    })
  });
}
