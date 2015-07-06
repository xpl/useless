require ('./useless')

Testosterone.run ({                             
    codebase: true,
    verbose:  false,
    silent:   false },
    function (okay) { if (!okay) { process.exit(1) } })