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