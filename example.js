"use strict";

/*  Usage:

        npm start example
        
*/

require ('./useless')

const Examples = $singleton (Component, {

    $defaults: {
        runCodeBaseTests: false,
        webpackEntries: {
            entry: {
                'example/shared': {
                    'example/useless.client':   "./useless.client.js",
                    'example/useless.devtools': "./useless.devtools.js",
                    'example/index':            "./example/index.js",
                }
            }
        },
        config: {
            webpack: {
                hotReload: true
            }
        }
    },

    $depends: [
        
        require ('./server/supervisor'),
        require ('./server/webpack'),
        require ('./server/templating'),
        require ('./server/http'),
        require ('./server/websocket'),
        require ('./server/REPL'),
        require ('./server/source')
    ],

    '/': () => $this.template ('./example/index.html'),

    '/example/:file': () => $this.file ('./example'),

    '/api/erroneous-method': { post: () => unknownFunction () },

    '/sqr?x={\\d+}':          ({ x    }) => Math.pow (Number (x),         2),  // x²
    '/pow?x={\\d+}&n={\\d+}': ({ x, n }) => Math.pow (Number (x), Number (n)), // x^n

    init () { log.green ('Example app is running at http://localhost:1333') }
})
