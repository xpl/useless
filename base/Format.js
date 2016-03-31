
_.deferTest (['identifier naming style interpolation'], function () {

    $assert (_.camelCaseToLoDashes        ('flyingBurritoOption'), 'flying_burrito_option')
    $assert (_.camelCaseToDashes          ('flyingBurritoOption'), 'flying-burrito-option')
    $assert (_.dashesToCamelCase          ('flying-burrito-option'), 'flyingBurritoOption')
    $assert (_.loDashesToCamelCase        ('flying_burrito_option'), 'flyingBurritoOption')

}, function () {

    _.camelCaseToDashes   =   function (x) { return x.replace (/[a-z][A-Z]/g, function (x) { return x[0] + '-' + x[1].lowercase }) }
    _.camelCaseToLoDashes =   function (x) { return x.replace (/[a-z][A-Z]/g, function (x) { return x[0] + '_' + x[1].lowercase }) }
    _.dashesToCamelCase   =   function (x) { return x.replace (/(-.)/g,       function (x) { return x[1].uppercase }) } })
    _.loDashesToCamelCase =   function (x) { return x.replace (/(_.)/g,       function (x) { return x[1].uppercase }) }

Format = {

    urlencode: function (obj) {
        return _.map (obj, function (v, k) { 
            return k + '=' + _.fixedEncodeURIComponent (v) }).join ('&') },

    /*  Use this to print objects as JavaScript (supports functions and $-tags output)
     */
    javascript: function (obj) {
        return _.stringify (obj, {
                    pretty: true,
                    pure: true,
                    formatter: function (x) {
                                    if (_.isTypeOf (Tags, x)) {
                                        return _.reduce (
                                                    _.keys (_.pick (x, _.keyIsKeyword)),
                                                        function (memo, key) { return key + ' ' + _.quote (memo, '()') },
                                                            _.stringify (Tags.unwrap (x))) }

                                    else if (_.isFunction (x)) {
                                        return x.toString () }

                                    else {
                                        return undefined } } }) },

    progressPercents: function (value, max) {
        return Math.floor ((value / max) * 100) + '%' },

    randomHexString: function (length) {
        var string = '';
        for (var i = 0; i < length; i++) {
            string += Math.floor (Math.random () * 16).toString (16) }
        return string },

    leadingZero: function (x) {
        return x < 10 ? '0' + x : x.toString () },
}

