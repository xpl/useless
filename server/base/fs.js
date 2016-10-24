const _  = require ('underscore')

module.exports = Function.promisifyAll (require ('fs'), {
                                            except: _.endsWith.$$ ('Sync')
                                                        .or (k => k[0] === k[0].toUpperCase ()) // rejects ClassName
                                                        .or (['createReadStream',
                                                              'createWriteStream',
                                                              'watch'].asSet.matches) })