const Meta = require ('meta-fields')

_.tests.lazy = () => {

    const $this = recorder ().this

    $assert ($this          [recorded],                                              { prop: 'this' }    )
    $assert ($this.foo      [recorded],                       { prop: 'foo', target: { prop: 'this' } }  )
    $assert ($this.foo (42) [recorded], { args: [42], target: { prop: 'foo', target: { prop: 'this' } } })

    ;(function () {

        const evaluate = interpreter ({ 'this': this })

        $assert (           this.yabba.dabba ('doo'),  'yabbadabbadoo')
        $assert (evaluate ($this.yabba.dabba ('doo')), 'yabbadabbadoo')

    }).call ({ // 'this' mock
                
        yabba: { dabba: x => 'yabbadabba' + x }
    })
}

const recorded = Symbol ()

const recorder = (target = undefined,
                  targetRecorder = x => {
                        if (target) { x.target = target }
                        x[recorded] = x
                        return recorder (x) }) =>

    new Proxy (new Function (), {

        apply: (this_, ___, args) => targetRecorder ({ args }),

          get: (this_, prop, ___) => (prop === recorded ||
                                      prop === Symbol.for ('String.ify')) ? target : targetRecorder ({ prop })
    })

const interpreter = (global = $global) => {

    const evaluate = x => {

        if (x && x[recorded]) {

            const { prop = null, args = null, target = global } = x[recorded]

            return (prop !== null) ? evaluate (target)[prop] :
                   (args !== null) ? evaluate (target)(...args.map (evaluate)) : global

        } else {

            return x
        }
    }

    return evaluate
}

module.exports = { recorder, interpreter }

