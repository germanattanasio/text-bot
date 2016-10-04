/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
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

casper.options.waitTimeout = 60000;

casper.start();

casper.thenOpen('http://localhost:3000', function (result) {
  casper.test.assert(result.status === 200,"Front page opens");

  casper.then(function () {
      casper.waitForSelector('#scrollingChat > div:nth-child(1)', function () {});
   });

  // Assert - Initial Dialog message
  casper.then(function(){
    casper.test.assertSelectorHasText('p', 'To get started, tell me the name of your city.');

    // Enter - City
    casper.sendKeys('#textInputOne', 'Austin');
    this.sendKeys('#textInputOne', casper.page.event.key.Enter, {
      keepFocus: true
    });
  });

 // Process response
  casper.then(function () {
    casper.waitForSelector('#scrollingChat > div:nth-child(3)', function () {});
  });

 // Check for Location disambiguation
  casper.then(function(){
   casper.test.assertSelectorHasText('p', 'Which state did you mean?');

    // Enter - State
    casper.sendKeys('#textInputOne', 'TX');
    this.sendKeys('#textInputOne', casper.page.event.key.Enter, {
      keepFocus: true
    });
  });

 // Process response
  casper.then(function () {
    casper.waitForSelector('#scrollingChat > div:nth-child(5)', function () {
    this.echo("Inside 5th");
    });
  });

   //Check for Response
   casper.then(function(){
    casper.test.assertSelectorHasText('p', 'weather for Austin ');
   });

}, null, 3 * 60 * 1000);

casper.run(function () {
  this.test.done();
});
