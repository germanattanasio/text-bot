# Watson Hands On Labs - Text Bot

<p align="center">
  <img src="http://g.recordit.co/mfjBM2ZJEn.gif" alt="demo" />
</p>


During this lab, attendees will build a bot using the IBM Watson Conversation service and the AlchemyLanguage API. Alchemy Language will extract entities and intents from the Conversation API results that are then transmitted to the Weather API to extract weather forecast data for a city in the US. Conversation service can be used with different bot kits such as those from Facebook and Twilio to enable users to have an intuitive and natural conversation with the bot.

You can see a version of this app that is already running [here](https://text-bot.mybluemix.net/). 

So let’s get started. The first thing to do is to build out the shell of our application in Bluemix.

## Creating a [IBM Bluemix][bluemix] Account

1. Go to https://bluemix.net/
2. Create a Bluemix account if required.
3. Log in with your IBM ID (the ID used to create your Bluemix account) 

**Note:** The confirmation email from Bluemix mail take up to 1 hour.

## Deploy this sample application in Bluemix

1. Clone the repository into your computer and navigate to the new directory

   ```none
   git clone https://github.com/watson-developer-cloud/text-bot.git
   cd text-bot
   ```

1. [Sign up][sign_up] in Bluemix or use an existing account.
1. If it is not already installed on your system, download and install the [Cloud-foundry CLI][cloud_foundry] tool.
1. Edit the `manifest.yml` file in the folder that contains your code and replace `text-bot` with a unique name for your application. The name that you specify determines the application's URL, such as `your-application-name.mybluemix.net`. The relevant portion of the `manifest.yml` file looks like the following:

    ```yml
    declared-services:
    conversation-service:
      label: conversation
      plan: free
    weatherinsights-service:
      label: weatherinsights
      plan: Free-v2
    cloudantNoSQLDB-service:
      label: cloudantNoSQLDB
      plan: Lite
    applications:
      - services:
        - conversation-service
        - weatherinsights-service
        - cloudantNoSQLDB-service
      name: text-bot
      command: npm start
      path: .
      memory: 512M
    ```

1. Connect to Bluemix by running the following commands in a terminal window:

  ```none
  cf api https://api.ng.bluemix.net
  cf login
  ```

1. Create and retrieve service keys to access the [Conversation](http://www.ibm.com/watson/developercloud/doc/conversation/) service by running the following command:

  ```none
  cf create-service conversation free conversation-service
  cf create-service-key conversation-service myKey
  cf service-key conversation-service myKey
  ```

1. Create and retrieve an API key to access the [Alchemy Language](http://www.ibm.com/watson/developercloud/alchemy-language.html) service (if you already have instance skip this step) by running the following command:

  ```none
  cf create-service alchemy_api free alchemy-language-service
  cf create-service-key alchemy-language-service myKey
  cf service-key alchemy-language-service myKey
  ```

1. Create and retrieve service keys to access the [Weather Insights service](https://console.ng.bluemix.net/docs/services/InsightsWeather/index.html) by running the following command:

  ```none
  cf create-service weatherinsights Free-v2 weatherinsights-service
  cf create-service-key weatherinsights-service myKey
  cf service-key weatherinsights-service myKey
  ```

1. Create an instance of the [Cloudant NoSQL database](https://cloudant.com/) service by running the following command:

  ```none
  cf create-service cloudantNoSQLDB Lite cloudantNoSQLDB-service
  cf create-service-key cloudantNoSQLDB-service myKey
  cf service-key cloudantNoSQLDB-service myKey
  ```

1. The Conversation service must be trained before you can successfully use this application. The training data is provided in the file `resources/conversation-training-data.json`. To train the model used by the Conversation service, do the following:

    1. Login to Bluemix

    2. Navigate to upper left hand side and click on the 3 parallel lines and select **Dashboard** from the left hand navigation panel.

    3. Scroll down and under "All Services" - select the instance of the Conversation service that you are using

    4. Once on the Service details page, scroll down (if necessary) and click green **Launch tool** button on the right hand side of the page. (You may be asked to log in again. or you may see a blank screen - give it a few minutes and refresh the screen). This will launch the tooling for the Conversation service, which allows you to build dialog flows and train your chatbot. This should take you to your workspace in the Conversation service which represents a unique set of chat flows and training examples. This allows you to have multiple chatbots within a single instance of the Conversation service. 

    5. Once on the page, you will see the option to either “Create” a new workspace, or “import” an existing one. We are going to “import” a premade chatbot for this example, so select “Import".
    
    6. Click **Choose a file**, navigate to the `resources` directory of your clone of the repository for this project, and select the file `conversation-training-data.json`.  Once the file is selected, ensure that the “Everything (Intents, Entities, and Dialog” option is selected.
    
    7. Click **Import** to upload the `.json` file to create a workspace and train the model used by the Conversation service.

    To find your workspace ID once training has completed, click the three vertical dots in the upper right-hand corner of the Workspace pane, and select **View details**.  Once the upload is complete, you will see a new workspace called “Weather Bot ASK”. In order to connect this workspace to our application, we will need to include the Workspace ID in our environment variables file “.env”.  

    Go back into your “.env” file, and paste the workspace ID next to the “WORKSPACE_ID=” entry.

1. Create a `.env` file in the root directory of your clone of the project repository by copying the sample `.env.example` file using the following command:
  
  ```none
  cp .env.example .env
  ```

    You will update the `.env` with the information you retrieved in steps 6 - 9.

    The `.env` file will look something like the following:
    
    ```none
    USE_WEBUI=true
    ALCHEMY_API_KEY=

    #CONVERSATION
    CONVERSATION_URL=https://gateway.watsonplatform.net/conversation/api
    CONVERSATION_USERNAME=
    CONVERSATION_PASSWORD=
    WORKSPACE_ID=

    #WEATHER
    WEATHER_URL=https://twcservice.mybluemix.net/api/weather
    WEATHER_USERNAME=
    WEATHER_PASSWORD=


    #CLOUDANT
    CLOUDANT_URL=

    #FACEBOOK
    USE_FACEBOOK=false
    FACEBOOK_ACCESS_TOKEN=
    FACEBOOK_VERIFY_TOKEN=

    #TWILIO
    USE_TWILIO=false
    USE_TWILIO_SMS=false
    TWILIO_ACCOUNT_SID=
    TWILIO_AUTH_TOKEN=
    TWILIO_API_KEY=
    TWILIO_API_SECRET=
    TWILIO_IPM_SERVICE_SID=
    TWILIO_NUMBER=
    ```


1. Install the dependencies you application need:

```none
npm install
```

1. Start the application locally:

```none
npm start
```

1. Test your application by going to: [http://localhost:3000/](http://localhost:3000/)

## Adding Facebook Messenger or Twilio

1. Edit the `.env` file to add credentials for Facebook and Twilio. See the following links for information about where you can get the credentials required by the botkit for each service:

    * [Facebook](https://github.com/howdyai/botkit/blob/master/readme-facebook.md#getting-started)
    * [Twilio](https://github.com/howdyai/botkit/blob/master/readme-twilioipm.md#getting-started)

2. If you are integrating with Twilio, set the `USE_TWILIO` and `USE_TWILIO_SMS` variables in your `.env` file to `true`. If you are integrating with Facebook, set the `USE_FACEBOOK` variable in your `.env` file to `true`.

3. Modify the file `lib/bot/bot.js` to include your own bot handling code. If you would like to use a separate bot messaging service (such as `wit.ai`, `converse.ai`, and so on ), you can add the middleware to each bot instance that you'd like for that service to use, and configure it with the single `bot.js` file.


## Deploying your Bot to Bluemix    

1. Push the updated application live by running the following command:

  ```none
  cf push
  ```
  
## Test

After completing the steps above, you are ready to test your application. Start a browser and enter the URL of your application.

                  <your application name>.mybluemix.net

You can also find your application name when you click on your application in Bluemix.

Begin entering questions such as “what is the weather for Austin, Texas?” If you don’t enter a state, it will ask you to clarify what state.



# Congratulations

You have completed the Text Bot Lab! :bowtie:

 ![Congratulations](http://i.giphy.com/3oEjI5VtIhHvK37WYo.gif)

[sign_up]: https://bluemix.net/registration
[bluemix]: https://console.ng.bluemix.net/
[wdc_services]: http://www.ibm.com/watson/developercloud/services-catalog.html
[alchemy_language]: http://www.ibm.com/watson/developercloud/doc/alchemylanguage
[cloud_foundry]: https://github.com/cloudfoundry/cli
