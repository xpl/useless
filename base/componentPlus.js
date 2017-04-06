"use strict";

const _ = require ('underscore')

_.tests['component+'] = {

    '$observableEnum': function () {

         var Compo = $component ({ mode:
                                    $observableEnum ('easy',
                                                     'normal',      // Simple enums (type + member)
                                                     'hard') })
            
         $assert (Compo.Mode, { Easy:   0,
                                Normal: 1,                          // Generates static integer enum type
                                Hard:   2 })

         var compo = new Compo  ({ mode:                            // Generates $observableProperty (property + change notifications)
                                    Compo.Mode.Easy })

            $assertEveryCalled (function (changed,
                                          changedToEasy) {
                                             compo.modeChange (log.red)          ;  compo.mode = Compo.Mode.Normal
                                             compo.normal (logs.red ('foo'))   }) }
}

/*  Observable enum (implemented via novel prototype macro facility from OOP.js)
 */

 Meta.globalTag ('observableEnum', function (impl) {
                                            return function () {
                                                return impl (_.asArray (arguments)) } })

$prototype.macroTag ('observableEnum', function (def, value, name, base) { var options = $untag (value)

    /*  Static enum
     */
    def[name.capitalized] = $static (_.fromPairs (
                                           _.map (options, function (name,             i) {
                                                             return [name.capitalized, i] })))
    /*  A trigger and predicate for each option
     */
    _.each (options, function (option, i) {
                           def[option]                    = $trigger ()
                           def['go' + option.capitalized] =            function () {        this.mode   = i }
                           def['is' + option.capitalized] = $property (function () { return this.mode === i }) })

    
    /*  Store state and call specific trigger upon change
     */
    def[name] = $observableProperty (function (value) {
                                  this[options[value]] () }); return def })