# Makers Final Project - Twitter Sentiment Bot

This is our final project at Makers. Our team of 4 (Nick, Matt, Chris and Josh) have made an app that uses tone and sentiment analysis software to return insights on tweets and hashtags returned by Twitter's API.  

This information is presented both via automated Language Reports tweeted out via a [twitter-bot](https://twitter.com/BotAnalysis), and in more depth via [Heroku](https://sentiment-analysis-twitter-bot.herokuapp.com/).  

## Getting started
* Fork this repo and clone to your machine
* Type ```npm i``` into the terminal to install required node packages  
* Type ```npm start``` to run the app locally

### Running tests
* Type ```jest``` into terminal to run the full test suite, or ```jest [file path]``` to run a specific test file.   

## MVP user stories:
> As a twitter user,  
> so I can read reports on current debates,  
> I want to follow the twitter bot.  

> As a twitter user,  
> so that the twitter bot is well informed,  
> I want to scrape trending hashtags.

> As a twitter user,  
> so I know what the top debates are,  
> I want the twitter bot to inform me what they are.

## Tech / framework used
* __Javascript__
* __CSS__
* __Node.js__
* __Jest__ (testing framework)
* __Twitter API__
* __Twitter apps__
* __React__
* __Heroku__
* __Trello__ (kanban-style workflow manager)
* __Balsamiq__ (design mock-up)
* __React table__ (for front end table design)
* __Victory__ (for charts)

## Development process and workflow
* __2 day sprints__ - at the start we discussed current progress, estimated the scope of new features (classing tasks as  small, medium or large), assessed blockages and assigned tasks amongst ourselves.
* __Retros__ - at the end of each sprint to reflect on what had been achieved, what had gone well and what we could improve.
* __Standups__ - a less formal chat at the start of the day where each person talks through work from the previous day, any issues and what they hope to achieve in the coming day.
* We used __Trello__ as a tool to manage the flow of tickets we created: https://trello.com/b/eRZgCy4K/twitter-bot

## First retro

![First retro](/assets/retro1.jpg "retro")

Things we agreed:

- Establish more formal processes including:
- Daily "retro" (i.e. short review of today's code)
- Code reviews
- Removing ability to push directly to master branch
- Testing (front end & API)


## Thursday planning session  

The second two day sprint focused on the following user stories:

> As a user  
> So I know what's going on in the world  
> I can see a list of top hashtags on the landing page  

> As a group member  
> So I know the API data is being handled correctly  
> All the JS API functions are fully tested  

## Second retro

![Second retro](/assets/retro2.JPG "retro 2")
We made some significant progress in the second sprint:  
- Set up React so we could begin developing our front end
- Reformatted the repository folder structure to work with React, including merging package.json files
- Passed a full suite of API JS and React component tests
- Incorporated graphing functionality to represent data in the front end.

## Middle weekend work

Over the weekend we split up several tasks that could be done individually
![Weekend work](/assets/weekend_work.JPG "weekend-work")


## Second week work

In our third retro we set out some ideas for how the front end would look:

![Third retro](/assets/retro3.1.2.jpg "retro 3")
![Third retro](/assets/retro3.jpg "retro 3")
![Third retro](/assets/retro3.1.jpg "retro 3")


Based on the prioritisation above and using the designs as a means of prioritising user stories, we build the front end. We came across an interesting challenge that required us to pass Twitter API data server-side, rather than accessing the data from the browser.

For the time being, in order to run the app in browser, it's necessary to download a chrome plugin, which enables Cross Original Resource Sharing (CORS). [Download the Chrome plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi). Switching this on will allow you to enter a phrase in the search box.

