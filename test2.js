require ('./useless')
require ('./base/Testicles')

/*  ------------------------------------------------------------------------ */

const App = $singleton (Component, {

    $defaults: {
        argKeys: { verbose: 1 } },

    $depends: [
        require ('./server/exceptions'),
        require ('./server/args'),
        require ('./server/supervisor') ],

/*  ------------------------------------------------------------------------ */

    init () {
            Testicles ({
                     verbose: this.args.verbose,
                      silent: false,
                      filter: t => this.args.values.isEmpty ||
                                   this.args.values.contains (t.name) ||
                                   this.args.values.contains (t.suiteName) }).then (() => process.exit ()) } })