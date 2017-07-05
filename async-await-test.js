/*  Usage:

        npm start async-await-test
        
*/

const _ = require ('./useless')
const fetch = require ('node-fetch')

module.exports = $singleton (Component, {

    $depends: [

        require ('./server/supervisor'),
        require ('./server/exceptions'),
        require ('./server/http'),
    ],

    '/test/promise': function () {

        log.ii ('Testing asynchronous logging / environment with Androgene Promises...')

        return __.sleep (500).then (() => {

            $http.setHeaders ({ 'Content-Type': 'text/plain' }) // pseudo-global $http (i.e. request context) works

            log.ww ('Lol') // asynchronus logging works

            return 'Lol'
        })
    },

    '/test/async-await': async () => { // async-await version (does not work without transpiling, because the native async/await impl forbids global Promise overriding)

        log.ii ('Testing async-await version...')

        await __.sleep (500)

        $http.setHeaders ({ 'Content-Type': 'text/plain' })

        log.ww ('Lol')

        return 'Lol'
    },
    
    async init () {

        log.gg ('Loaded')

        setTimeout (async function () {

            $assert ('Lol', await fetch ('http://localhost:1333/test/promise').then (r => r.text ()))
            $assert ('Lol', await fetch ('http://localhost:1333/test/async-await').then (r => r.text ()))
        })
    }
})
