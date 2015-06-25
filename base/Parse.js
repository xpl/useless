/*  Parsers (TODO: REFACTOR)
    ======================================================================== */

_.tests.parse = {
    fileName: function () {
        $assert (Parse.fileName ('блабла'), 'блабла')
        $assert (Parse.fileName ('блабла.jpg'), 'блабла')
        $assert (Parse.fileName ('c:\\блабла/path/path2/блабла.jpg'), 'блабла')
    }
}

Parse = {

    keyCodeAsString: function (key) {
        return String.fromCharCode ((96 <= key && key <= 105) ? key - 48 : key) },

    fileName: function (path) {
        return _.first (_.last (path.split (/\\|\//)).split ('.')) },

    phoneNumber: function (input) {
        var numeric = input.numericValue
        if (numeric.length && numeric[0] === '8') {
            return ('7' + numeric.slice (1)) }
        else {
            return numeric } },

    sqlDate: function (date) {
        if (!date) {
            return undefined }
        var dateTime = date.split (' ')
        var date = dateTime[0].split ('-')
        var time = dateTime.length > 1 ? dateTime[1].split (':') : ['0', '0', '0']
        var seconds = parseFloat (time[2])
        return new Date (
            parseInt (date[0], 10), parseInt (date[1], 10) - 1, parseInt (date[2], 10),
            parseInt (time[0], 10), parseInt (time[1], 10), Math.floor (seconds),
            (seconds - Math.floor (seconds)) * 1000) },

    timestampFromDateTimeString: function (date) {
        if (!date)
            return undefined

        var dateTime = date.split (' ')
        var date = dateTime[0].split ('.')
        var time = dateTime.length > 1 ? dateTime[1].split (':') : ['0', '0', '0']
        return (new Date (
            (date[2].length > 2 ? 0 : 2000) + parseInt (date[2], 10),   // year
            parseInt (date[1], 10) - 1,                                 // month
            parseInt (date[0], 10),                                     // day
            parseInt (time[0], 10),                                     // hour
            parseInt (time[1], 10))).getTime () }                       // minute
}
