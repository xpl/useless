require ('./useless')

/*  ======================================================================== */

BuildApp = $singleton (Component, {

    $defaults: {
        argKeys: { verbose: 1 } },

    $depends: [
        require ('./server/args'),
        require ('./server/supervisor') ],

/*  ======================================================================== */

    init: function () {
            Testosterone.run ({
                     verbose: this.args.verbose,
                      silent: false,
                      filter: t => this.args.values.isEmpty ||
                                   this.args.values.contains (t.name) ||
                                   this.args.values.contains (t.suite) }).then (function () { process.exit () }) } })