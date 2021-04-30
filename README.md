# ZAIRZA WEBSITE 2020

![Zairza Github](https://raw.githubusercontent.com/zairza-cetb/zairza-web/main/public/images/Zairzalogo.webp)

<strong>ZAIRZA</strong>, the robo-sof club of CET, a conglomeration of seasoned developers and designers. 
Founded in the year 2005, the club has ever since witnessed a synapse of creativity and evolution.

Hosted in [Here](https://zairza.in). 
## Installation for Developers 

Zairza API can be setup to run via node's default package manager `Npm`.

### Standard Installation

Follow these steps to get the api running using npm

1. Install these dependencies if you don't already have them
   - [Firebase](https://firebase.google.com/docs/web/setup) 
   - [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
   - [Nodejs](https://nodejs.org/en/)<br>
   <strong>Note:</strong><em>If you do not have MongoDB on your own system, you can proceed with the connection string. Please ensure the right access permissions and firewall openings for the VM/server where the MongoDB is hosted.</em>
2. Clone this repo to your local machine

   ```sh
   git clone https://github.com/zairza-cetb/zairza-web/
   cd zairza-web
   npm install
   ```

3. Run this command for git hooks setup

   ```sh
   git config --local core.hooksPath .githooks/
   ```

3. Create `.env` file in the root directory of the project
   `.env` file is used to store the secret or environment variables.

   ```sh
   touch .env
   ```

4. Copy the `.env.example` to `.env`
   
   ```sh
   cp .env.example .env
   ```

5. Fill out the following fields:

   - NODE_ENV
   - FIREBASE_PROJECT_ID
   - FIREBASE_CLIENT_EMAIL
   - FIREBASE_PRIVATE_KEY
   - FIREBASE_API_KEY
   - FIREBASE_MESSAGING_SENDER_ID
   - FIREBASE_APP_ID
   - FIREBASE_MEASUREMENT_ID
   - MONGO_URI

     Follow instructions in the comments at the top of `.env`

6. Install required node packages

   ```sh
   npm install
   ```

7. Now that we have all the packages, execute the following command to run the server.

   1. If you are in production
      NB: You only have to execute the following command to run the server in future.

      ```sh
      npm run start
     ```    
   2.  If you are in development

      ```sh
      npm run dev
      ```   

## Contributing to Zairza-Web
Thank you for your interest in contributing to Zairza. Regardless of the size of the contribution you make, all contributions are welcome and are appreciated. 

If you are new to contributing to open source, please read the Open Source Guides on [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/).

### Ways to Contribute
If you are ready to start contributing code right away, we have a list of [good first issues](https://github.com/zairza-cetb/zairza-web/issues/labels/good%20first%20issue) that contain issues with a limited scope. 


### Contributing Code
Code contributions to Zairza come in the form of pull requests. These are done by forking the repo and making changes locally. 

The process of proposing a change to Zairza can be summarized as:
1. Fork the Zairza repository and branch off `master`.
1. The repository can be cloned locally using `git clone <forked repo url>`.
1. Make the desired changes to the  source.
1. Run the app and test your changes.
1. If you've added code that should be tested, write tests.

### General Guidelines

#### Project structure

```
----+
    |
    |---- errorHandlers
    |      |
    |      +---- error Handlers functionalities 
    |---- firebase
    |      | 
    |      +---- firebase functionalities
    |---- models
    |      |
    |      +---- models functionalities
    |---- public
    |      |
    |      +---- css 
    |      |      |
    |      |       +---- css files for ejs
    |      +---- images
    |      |      |
    |      |      +---- files with should store as per sections
    |      +---- js
    |             |
    |             +---- js files for ejs
    |---- routes
    |      |
    |      +---- routes as per user roles
    |---- views
    |      | 
    |      +---- pages
    |      |      | 
    |      |      +---- Main pages
    |      |      |       |  
    |      |      |       +---- tabs/sections
    |      |      +---- Other Pages
    |      +---- partials
    |             |  
    |             +---- Components 
```

#### Commit guidelines

```
feat: (addition of a new feature)
rfac: (refactoring the code: optimization/ different logic of existing code - output doesn't change, just the way of execution changes)
docs: (documenting the code, be it readme, or extra comments)
bfix: (bug fixing)
chor: (chore - beautifying code, indents, spaces, camelcasing, changing variable names to have an appropriate meaning)
ptch: (patches - small changes in code, mainly UI, for example color of a button, increasing size of text, etc)
conf: (configurational settings - changing directory structure, updating gitignore, add libraries, changing manifest etc)
```

#### Community
The Zairza has a Discord server where members can assist with support and clarification. Click [here](https://discord.gg/csncy9BaHv) to join our discord server.

