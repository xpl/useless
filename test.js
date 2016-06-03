require ('./useless')

/*  ======================================================================== */

BuildApp = $singleton (Component, {

    deferAppComponentTests: false,

    $defaults: {
        argKeys: { verbose: 1 } },

    $depends: [
        require ('./server/args'),
        require ('./server/tests'),
        require ('./server/supervisor') ],

/*  ======================================================================== */

    init: function () {
            return Testosterone.run ({
                     verbose: this.args.verbose,
                      silent: false,
                      filter: t => this.args.values.isEmpty || this.args.values.contains (t.name) }) } })