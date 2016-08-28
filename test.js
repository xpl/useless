"use strict";

require ('./useless')

/*  ------------------------------------------------------------------------ */

const BuildApp = $singleton (Component, {

    $defaults: {
        argKeys: { verbose: 1 } },

    $depends: [
        require ('./server/args'),
        require ('./server/supervisor') ],

/*  ------------------------------------------------------------------------ */

    init () {
            Testosterone.run ({
                     verbose: this.args.verbose,
                      silent: false,
                      filter: t => this.args.values.isEmpty ||
                                   this.args.values.contains (t.name) ||
                                   this.args.values.contains (t.suite) }).then (() => { process.exit () }) } })