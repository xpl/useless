 module.exports = ServerIo = $trait ({

    exec: (function () { var exec = require ('child_process').exec
                  return function (cmd,         then) {
                      return exec (cmd, this.$ (then)) } }) (),

})