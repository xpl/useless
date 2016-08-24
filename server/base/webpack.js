 module.exports = function (input, output) {
    
    var webpack = require ('webpack'),
        path    = require ('path'),
        fs      = require ('fs')

    var compiler = webpack ({
                          entry: path.resolve (input),
                        devtool: 'source-map',
                         output: { path: path.dirname (output), filename: path.basename (output) },
                        plugins: [ new webpack.optimize.DedupePlugin (),
                                   new webpack.IgnorePlugin(/^fs|path$/) ],
                         module: { loaders: [ { test: /\.css$/, loader: "style-loader!css-loader" } ] } })

    compiler.run = compiler.run.promisify

    return compiler.run ().then (stats => { stats = stats.toJson ('normal')

        if (stats.warnings.length > 0) {
            stats.warnings.each (log.w) }

        if (stats.errors.length > 0) {
            stats.errors.each (log.ee)
            throw new Error ('webpack failure') }

        return fs.readFileSync (output, 'utf-8')
    })
}