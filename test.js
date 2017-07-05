"use strict";

require ('./useless')

/*  ------------------------------------------------------------------------ */

const TestApp = $singleton (Component, {

    $defaults: {
        argKeys: { verbose: 1 } },

    $depends: [
        
        $trait ({ beforeInit () { this[Symbol.for ('String.ify')] = () => '<TestApp>' } }),
        
        require ('./server/args'),
        require ('./server/supervisor'),
        require ('./server/tests'),
        require ('./server/api') ],

/*  ------------------------------------------------------------------------ */

    init () {



        Testosterone.run ({
                 verbose: this.args.verbose,
                  silent: false,
                  filter: t => this.args.values.isEmpty ||
                               this.args.values.contains (t.name) ||
                               this.args.values.contains (t.suite) }).then (() => { process.exit () }) } })