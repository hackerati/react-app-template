'use strict'

const express = require ('express')

const app = express ()
const port = 4000

if (process.env.NODE_ENV == 'development') {
    // run webpack as middleware in development to enable hot reload
    const webpack = require ('webpack')
    const webpackDevMiddleware = require ('webpack-dev-middleware')
    const webpackHotMiddleware = require ('webpack-hot-middleware')
    const config = require ('./webpack.config.dev')
    const compiler = webpack (config)
    app.use (webpackDevMiddleware (compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
          }
        })
    )
    app.use (webpackHotMiddleware (compiler))
} else {
    // assume webpack has been run at deploy time when not in development
    app.use ('/static', express.static (`${__dirname}/dist`))
}

// serve a single page application
app.get ('*', (req, res) => { res.sendFile (`${__dirname}/index.html`) })

app.listen (port, (error) => {
    if (error) {
        console.error (error)
    } else {
        console.info (`==> 🌎  Listening on port ${port}`)
    }
})
