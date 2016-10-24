"use strict";

const _ = require ('underscore')

/*  Parsers (TODO: REFACTOR)
    ======================================================================== */

_.tests.parse = {
    fileName: function () {
        $assert (Parse.fileName ('блабла'), 'блабла')
        $assert (Parse.fileName ('блабла.jpg'), 'блабла')
        $assert (Parse.fileName ('c:\\блабла/path/path2/блабла.jpg'), 'блабла')
    }
}

$global.Parse = {
    
    keyCodeAsString: function (key) {
        return String.fromCharCode ((96 <= key && key <= 105) ? key - 48 : key) },

    fileName: function (path) {
        return _.last (path.split (/\\|\//)).split ('.')[0] },
}
