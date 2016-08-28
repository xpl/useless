const _ = module.exports = require ('underscore')

_.fromPairs = _.object      // was trying to migrate to lodash, but had no luck, these ones had left as an migration artifact...
_.mapValues = _.mapObject

_.zipWith = (rows, zippo) =>
                _.reduce (rows.slice (1), (memo, row) =>
                    _.times (Math.max ((memo && memo.length) || 0, (row && row.length) || 0), i =>
                        zippo (memo && memo[i], row && row[i])), rows[0])

if ('a1 b2 c3' !== _.zipWith ([['a','b','c'], [1,2,3]], function (a, b) { return a + b }).join (' ')) {
    throw new Error ('_.zipWith broken') }