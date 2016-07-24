"use strict";

/*  ------------------------------------------------------------------------ */

_.tests['Channel'] = {

    'is promise': () => {

        $assert ((new Channel ()) instanceof Promise) },

    'resolve from constructor + then + chanining': done => {

        new Channel (resolve => { resolve (123) })
                .then (x => { $assert (x, 123); return 456 }, () => { $fail })
                .then (y => { $assert (y, 456); done () })
    },

    'reject from constructor': done => {

        new Channel ((resolve, reject) => { reject (123) })
                .then (() => { $fail },
                        x => { $assert (x, 123); done () })
    },

    'throw from constructor + .catch + chanining': done => {

        new Channel ((resolve, reject) => { throw 'foo' })
                .then (() => { $fail })
                .catch (x => { $assert (x, 'foo'); return 'bar' })
                .then (y => { $assert (y, 'bar'); done () },
                      () => { $fail })
    },

    'throw from .then': done => {

        new Channel (123)
                .then (x => { throw x + 1 })
                .catch (x => { $assert (x, 124); done () })
    },

    'pending state': () => { $assert ('pending', new Channel ().then (() => $fail).state) },

    'new Channel (const)': () => (new Channel (123)).assert (123),

    'recognized by tests as Promise': () => Channel.resolve (123).assert (123),

    'accepted by Promise.all': () => Promise.all ([
                                        Channel.resolve (123).assert (123),
                                        Channel.reject (456).assertRejected (456) ]).assert ([123, 456]),


    'returning channel from then + .resolve': () => {

        var x = Channel.resolve (123),
            y = undefined,
            calls = []

            x.then (() => (y = new Channel (456)))
             .then (x => calls.push (x)) // should call twice, with 456 and 789 (later)

        y.resolve (789)

        $assert (calls, [456, 789])
    },

    '$channel for $prototype': () => {

        var Model = $prototype ({

            numPersons: $channel ()
        })

        var View = $prototype ({

            label: $channel ()
        })

    /*  $channel tag creates a readwrite property with same name,
        but it should keep $channel tag in meta-information (for reflection purposes)   */

        $assert ($channel.is (Model.$definition.numPersons))

    /*  Should be configurable from constructor params  */

        var model = new Model ({ numPersons: 10 }),
            view  = new View ()

        $assert (model.numPersons.value, 10)
        $assert (view.label.state, 'pending')

    /*  This is not a simple by-reference assignment, but a channel binding   */

        view.label = model.numPersons.then (x => x + ' persons')

        $assert (view.label !== model.numPersons)
        $assert (view.label.value, '10 persons')

    /*  Assignment to a non-promise should update value    */

        model.numPersons = 11
        
        $assert (view.label.value, '11 persons')
    },

    '$channel(const)': () => {

        $assert ($singleton ({ count: $channel (7) }).count.value, 7)
    }
}

/*  ------------------------------------------------------------------------ */

$global.Channel = $extends (Promise, {

    constructor: function (fn, transducers, before) { 

                    this.after = []
                    this.state = 'pending'
                    this.value = undefined
                    this.transducers = {
                            resolve: (transducers && transducers.resolve) || (x => x),
                            reject:  (transducers && transducers.reject)  || (e => { throw e }) }

                    if (fn instanceof Function) {
                        try {
                            fn.call (this,
                                this.$ (this.resolve),
                                this.$ (this.reject)) }

                        catch (e) {
                            this.reject (e) } }

                    else if (fn !== undefined) {
                        this.resolve (fn) } },

    $private: {

        _resolve: function (x) {
                    this.state = 'resolved'
                    this.value = x
                    this.after.forEach (c => c.resolve (x)) },

        _reject: function (e) {
                    this.state = 'rejected'
                    this.value = e
                    this.after.forEach (c => c.reject (e)) } },

    resolve: function (x, transducer) {

                try {
                    x = (transducer || this.transducers.resolve) (x)

                    if (x instanceof Promise) {
                        x.then (
                            x => this._resolve (x),
                            e => this._reject (e)) }

                    else {
                        this._resolve (x) } }
                        
                catch (e) {
                    this._reject (e) } },

    reject: function (e) {
                return this.resolve (e, this.transducers.reject) },

    then: function (resolve, reject) {

            var c = new Channel (undefined, { resolve: resolve, reject: reject }, this)

            this.after.push (c)

            if (this.state === 'resolved') {
                c.resolve (this.value) }

            else if (this.state === 'rejected') {
                c.reject (this.value) }

            return c },

    catch: function (fn) {
                return this.then (undefined, fn) },
})

/*  ------------------------------------------------------------------------ */

Channel.all = arr => new Channel (resolve => {

                                    var complete = new Set (),
                                        value = new Array (arr.length)

                                    arr.forEach ((c, i) => {

                                        c.then (x => { value[i] = x
                                            
                                            if (complete.length === value.length) {
                                                resolve (value) }
                                            else {
                                                complete.add (i) } }) }) })

/*  ------------------------------------------------------------------------ */

Channel.resolve = x => new Channel ( resolve          => resolve (x))
Channel.reject  = e => new Channel ((resolve, reject) => reject  (e))

/*  ------------------------------------------------------------------------ */

$prototype.macroTag ('channel', (def, value, name) => {

    var memberName = '_' + name
    var initialValue = $untag (value)

    def[name] = Tags.modify (value, () => $property ({

        get: function () {
                return this[memberName] ||
                      (this[memberName] = new Channel (initialValue)) },

        set: function (x) {
                this[name].resolve (x) }
    }))
})

/*  ------------------------------------------------------------------------ */


