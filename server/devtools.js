/*var git  = require ('nodegit'),
    exec = require ('child_process').exec
*/

var fs      = require ('fs'),
    path    = require ('path'),
    process = require ('process')

ServerDevtools = module.exports = $trait ({

    $depends: [require ('./io'),
               require ('./request'),
               require ('./api')],

    sourceRoot: process.cwd (),
    devHint: log.warn,

    api: function () {

        if (!this.developerAccess || !this.isDeveloper) {
             this.developerAccess = _.identity
             this.isDeveloper     = _.constant (true)
             this.devHint ("Add 'auth' trait to restrict access to devtools API") }

        return {
            'echo':             { post: this.echo },
            'api': {
                'source/:file': { get:  this.developerAccess (this.allowOrigin ('*', this.readSource)),
                                  post: this.developerAccess (this.allowOrigin ('*', this.jsonInput (this.writeSource))) },
                'git-commits':  { get:  this.developerAccess (this.gitCommits) },
                'git-pull':     { post: this.developerAccess (this.gitPull) } } } },


    afterInit: function () { // remote logging
        if (this.messageToPeers) {
            _.onAfter (log.impl, 'defaultWriteBackend', this.$ (params => {
                this.messageToPeers ({ what: 'log', params: params }, this.isDeveloper) })) } },

    /*  Prints raw incoming HTTP data (for debugging of client write methods)
     */
    echo: function (context) {
        context.data (data => {
            console.log ('ECHO:', data)
            context.success (data) }) },

    /*  Access to source code of server (requires developer privileges)
     */
    readSource: function (context) { log.info ('Reading', context.env.file)

        _.readSource (context.env.file[0] === '/'
            ? context.env.file
            : path.join (this.sourceRoot, context.env.file), function (text) { context.success (text) }) },
        
    writeSource: function (context) { log.warn ('Writing', context.env.file)

        _.writeSource (path.join (this.sourceRoot, context.env.file), context.env.text, context.$ (context.jsonSuccess)) },

    /*  Git tools
     */
    gitLastCommitStatus: function (complete) {
        exec ('git log -1 --name-status', (e, stdout, stderr) => {
            if (e) {
                complete (null) }
            else {
                complete ({ hash: stdout.split ('\n')[0].split (' ')[1] }) } }) },

    gitCommits: function (context) { var items = []
        git.Repo.open ('./', (e, repo) => { if (e) { throw e }
            repo.getMaster ((e, branch) => { if (e) { throw e }
                var history = branch.history ()
                history.on ('commit', function (commit) {
                    items.push ({
                        _id: commit.sha (),
                        author: commit.author ().name (),
                        email: commit.author ().email (),
                        date: Date.parse (commit.date ()),
                        message: commit.message () }) })

                history.on ('end', function () {
                    context.jsonSuccess (items) })

                history.start () }) }) },

    gitPull: function (context) {
        exec ('git pull', this.$ ((e, stdout, stderr) => {
            if (e) {
                context.jsonFailure (e) }
            else {
                context.jsonSuccess () }

            this.restart () })) },

})