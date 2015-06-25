Format = {

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

    randomHexString: function (length) {
        var string = '';
        for (var i = 0; i < length; i++) {
            string += Math.floor (Math.random () * 16).toString (16) }
        return string },

    leadingZero: function (x) {
        return x < 10 ? '0' + x : x.toString () },

    plural: function (n, a, b, c) /* ex.: plural (21, 'час', 'часа', 'часов') */ {
        if (_.isArray (a)) {
            c = a[2]
            b = a[1]
            a = a[0] }
        var cases = [c, a, b, b, b, c]
        return n + ' ' + ((n % 100 > 4) && (n % 100 < 20) ? c : cases[Math.min(n % 10, 5)]) }
}

