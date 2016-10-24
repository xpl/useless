"use strict";

const _ = require ('underscore')

$global.Sort = {
    Ascending: 1,
    Descending: -1,
    strings: function (a, b) {
        a = $.trim (a).toLowerCase ()
        b = $.trim (b).toLowerCase ()
        if (a.length == 0 && b.length > 0) {
            return 1;
        } else if (a.length > 0 && b.length == 0) {
            return -1;
        } else {
            return a == b ? 0 : (a < b ? -1 : 1)
        }
    },
    numbers: function (a, b) {
        if (isNaN (a) && isNaN (b)) {
            return 0
        } else if (isNaN (a)) {
            return -1
        } else if (isNaN (b)) {
            return 1
        } else {
            return a < b ? -1 : (a > b ? 1 : 0)
        }
    },
    generic: function (a, b) {
        if (!a && !b) {
            return 0
        } else if (!a) {
            return -1
        } else if (!b) {
            return 1
        } else {
            return a < b ? -1 : (a > b ? 1 : 0)
        }
    },
    inverse: function (sort) {
        return function (a, b) {
            return -(sort (a, b))
        }
    },
    field: function (name, sort, order) {
        return function (a, b) {
            return sort (a[name], b[name]) * order
        }
    }
}
