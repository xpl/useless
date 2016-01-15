ServerAuth = module.exports = $trait ({

    $depends: [require ('./entity')],

    api: function () {
        return {
            'api/login':    { post: this.jsonInput (this.doLogin) },
            'api/logout':   { post: this.doLogout, get: this.doLogout } } },

    /*  Login/logout
     */

    doLogin: function (context) {
        var login = { email: context.env.email, password: context.env.password }
        if (login.email && login.password) {
            this.db.users.find (login).count (function (e, count) {
                if (e) {
                    context.jsonFailure ('Ошибка БД') }
                else if (count > 0) {
                    context.setCookies (login).jsonSuccess () }
                else {
                    context.jsonFailure ('Неправильный e-mail или пароль') } }) }
        else {
            context.jsonFailure ('Не указан e-mail или пароль') } },

    doLogout: function (context) {
        context
            .removeCookies (['email', 'password'])
            .jsonSuccess () },


    /*  Request processing primitives for auth purposes
     */

    asServerHerself: function (then) {
        return this.$ (function (context) {
            context.env.who = this.serverHerself
            then.call (this, context) }) },

    userAccess: function (predicate, then) {
        return this.resolveUser (this.$ (function (context) {
            if (context.env.who && predicate (context.env.who)) {
                then.call (this, context) }
            else {
                context.notFound () } })) },

    adminAccess: function (then) {
        return this.userAccess (_.property ('isAdmin'), then) },

    isDeveloper: function (user) {
        return user.isAdmin && user.isDeveloper },

    developerAccess: function (then) {
        return this.userAccess (function (who) { return who.isAdmin && who.isDeveloper }, then) },

    resolveUser: function (then) {
        return this.$ (function (context) {
            if (context.cookies.email && context.cookies.password && !context.env.who) {
                this.db.users.find ({ email: context.cookies.email, password: context.cookies.password }).toArray (
                    this.$ (function (e, persons) {
                        if (persons && persons.length > 0) {
                            context.env.who = _.extend ({ persons: persons }, persons[0]) }
                        then.call (this, context) })) }
            else {
                then.call (this, context) } }) }

})