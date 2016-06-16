# React App Template

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

## Start Your Own Project

```bash
$ git clone git@github.com:thehackerati/react-app-template.git my_app
$ cd my_app
$ npm install
```

## Run in development mode

```bash
$ npm test
$ NODE_ENV='development' npm start
$ open http://localhost:3000
```

## Run in production mode

```bash
$ npm run build
$ NODE_ENV='production' npm start
$ open http://localhost:3000
```

## Tutorial

If you're new you React + Redux, try our [tutorial] (https://www.gitbook.com/book/hackerati/react-tutorial/details).

## What's Inside

```bash
.
├── index.html                  # Single page for the application
├── server.js                   # Express server
├── src
│   ├── containers              # Root container
│   ├── counter                 # Placeholder app, implements simple immutable counter
│   ├── index.js                # Start the app by rendering the  AppContainer
│   ├── reducers.js             # Root reducer, combines app reducers
│   └── store                   # Single store
├── tests
│   ├── counter                 # Tests for placeholder app
│   └── test_helper.js          # Shared test utils
├── webpack.config.dev.js       # Webpack config for development
└── webpack.config.prod.js      # Webpack config for production
```

## Resources & Credits
- [ReactJS](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/index.html)
- [Redux DevTools](https://github.com/gaearon/redux-devtools)
- [Getting Started With Redux, by Jérôme Chapron](http://www.jchapron.com/2015/08/14/getting-started-with-redux/)
- [A Comprehensive Guide to Test-First Development with Redux, React, and Immutable, by Tero Parviainen] (http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)
- [Rules For Structuring (Redux) Applications] (http://jaysoo.ca/2016/02/28/organizing-redux-application/)

## License
Copyright (c) 2016 Hackerati. This software is licensed under the MIT License.
