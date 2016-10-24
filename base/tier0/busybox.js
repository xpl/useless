"use strict";

const _ = require ('underscore')

/*  Basic utility for writing data-crunching functional expressions.
    ======================================================================== */

_.typeOf = function (what) {
                return typeof what }

_.instanceOf = function (what) {
                    return function (x) { return (x instanceof what) } }

_.count = function (what) { // cannot override _.length
                return what.length }

_.array = _.tuple = function () {
                        return _.asArray (arguments) }

_.cons = function (head, tail) { return [head].concat (tail || []) }

_.atIndex = function (n) {
                return function (arr) { return arr[n] } }

_.takesFirst = _.higherOrder (_.first)
_.takesLast  = _.higherOrder (_.last)

_.applies = function (fn, this_, args) {
                return function () { return fn.apply (this_, args) } }

_.prepends = function (what) {
                return function (to) {
                    return what + to } }

_.appends = function (what) {
                return function (to) {
                    return to + what } }

_.join = function (arr, s) { return arr.join (s) }
_.joinWith = _.flip2 (_.join)
_.joinsWith = _.higherOrder (_.joinWith)

_.split      = function (s, del) { return s.split (del) }
_.splitWith  =                   _.flip2 (_.split)
_.splitsWith =             _.higherOrder (_.splitWith)

_.sum = function (a, b) {
            return (a || 0) + (b || 0) }


_.subtract = function (a, b) {
                return (a || 0) - (b || 0) }

_.mul = function (a, b) {
            return (a || 0) * (b || 0) }

_.equal = function (a, b) {
            return a === b }

_.sums      = _.plus  = _.higherOrder (_.sum)
_.subtracts = _.minus = _.higherOrder (_.subtract)
_.muls                = _.higherOrder (_.mul)
_.equals              = _.higherOrder (_.equal)

_.less           = function (a, b) { return a <  b }
_.lessOrEqual    = function (a, b) { return a <= b }
_.greater        = function (a, b) { return a >  b }
_.greaterOrEqual = function (a, b) { return a >= b }

_.isNegative = function (a) { return a < 0 }

_.largest = function (a, b) {                   // FFFFUUUU: underscore already taken _.max for its dirty needs.
                if (isNaN (a) && isNaN (b)) {
                    return NaN }
                else if (isNaN (a)) {
                    return b }
                else if (isNaN (b)) {
                    return a }
                else {
                    return Math.max (a, b) } }

_.notZero = function (x) { return x !== 0 }

_.propertyOf = function (obj) { return function (prop) {            // inverted version of _.property
                                            return obj[prop] }}

_.oneOf = $restArg (function () {
    return _.propertyOf (_.index (_.asArray (arguments))) })
