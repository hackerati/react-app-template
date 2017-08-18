# React Application Template

Basic React application template, including:

- Redux
- ImmutableJS
- Babel
- ES6
- Node
- Express
- Webpack
- Hot Reloader
- Mocha & Chai

## Start your own project

```bash
$ git clone git@github.com:thehackerati/react-app-template.git my_react_app
$ cd my_react_app
$ npm install
```

## Run in development mode

```bash
$ npm test                           # run the tests
$ NODE_ENV='development' npm start   # start the application with the development config
```
And then open http://localhost:4000 in your browser

## Run in production mode

```bash
$ npm run build
$ NODE_ENV='production' npm start   # start the application with the production config
```
And then open http://localhost:4000 in your browser

## Tutorial

If you're new you React + Redux, try our [tutorial](https://www.gitbook.com/book/hackerati/react-tutorial/details) on a TDD approach to a simple TodoMVC application. Start reading the tutorial by clicking on the green 'Read' button.

## What's inside

```bash
.
├── src/
│ ├── containers/                # Root container
│ │ ├── DevTools.js
│ │ ├── Root.dev.js
│ │ ├── Root.js
│ │ └── Root.prod.js
│ ├── counter/                   # Placeholder app, implements simple immutable counter
│ │ └──...
│ ├── store/                     # Single store
│ │ ├── configureStore.dev.js
│ │ ├── configureStore.js
│ │ └── configureStore.prod.js
│ ├── PropTypes.js               # Custom PropType checker for the redux store
│ ├── index.js                   # Start the app by rendering the AppContainer
│ └── reducers.js                # Root reducer, combines app reducers
├── tests/
│ ├── counter/                   # Tests for the placeholder app
│ │ └──...
│ └── test_helper.js             # Shared test utils
├── .babelrc                     # Babel local configuration file
├── .eslintignore                # ESLint ignore file
├── .eslintrc                    # ESLint local configuration file
├── .gitignore                   # git ignore file
├── .travis.yml                  # Travis CI configuration file
├── index.html                   # Single page for the application
├── LICENSE                      # The MIT License
├── package.json                 # Metadata to identify the project/handle the project's dependencies
├── README.md                    # git ReadMe file
├── server.js                    # Express server
├── webpack.config.dev.js        # Webpack config for development
└── webpack.config.prod.js       # Webpack config for production
```

## Resources & credits
- [ReactJS](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/index.html)
- [Redux DevTools](https://github.com/gaearon/redux-devtools)
- [Getting Started With Redux](http://www.jchapron.com/2015/08/14/getting-started-with-redux/), by Jérôme Chapron
- [A Comprehensive Guide to Test-First Development with Redux, React, and Immutable](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html), by Tero Parviainen
- [Three Rules For Structuring (Redux) Applications](http://jaysoo.ca/2016/02/28/organizing-redux-application/), by Jack Hsu

## License
Copyright (c) 2016 Hackerati. This software is licensed under the MIT License.
