"use strict";

/*  Extensions methods
    ======================================================================== */

;['method', 'property', 'flipped', 'forceOverride'].forEach (Tags.define)
    
$global.$extensionMethods = (Type, methods) => {

    _.each (methods, (tags, name) => { var fn = Tags.unwrap (tags)

        /*  define as _.method (this, ...)
         */
        if (!(name in _)) {
                      _[name] = _[name] || fn }

        /*  define as property of Type
         */
        if (!tags.$method && (tags.$property || (_.oneArg (fn)))) {
            if (!(name in Type.prototype) || tags.$forceOverride) {
                _.defineHiddenProperty (Type.prototype, name, function () { return fn (this) }) } }

        /*  define as method
         */
        else if (!tags.$property) {
            if (!(name in Type.prototype) || tags.$forceOverride) {
                Type.prototype[name] = _.asMethod (tags.$flipped ? _.flip (fn) : fn) } }

        else {
            throw new Error ('$extensionMethods: crazy input, unable to match') } })}