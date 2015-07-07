require ('./useless')

Testosterone.run ({                             
    codebase: true,
    verbose:  true,
    silent:   false },
    function (okay) { if (!okay) { process.exit(1) } })
