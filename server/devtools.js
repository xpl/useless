 "use strict";

const _  = require ('underscore')

/*var git  = require ('nodegit'),
    exec = require ('child_process').exec
*/

const fs        = require ('fs'),
      path      = require ('path'),
      process   = require ('process'),
      getSource = require ('get-source')

module.exports = $trait ({

    $depends: [require ('./http')],

    $defaults: {

        sourceRoot:
            process.cwd (),

        config: {
            developer: true } },

    devHint: log.warn,

    api () {

        if (!this.requireDeveloper) {
             this.requireDeveloper = _.identity
             this.devHint ("Implement requireDeveloper() to restrict access to devtools API") }

        return {

            /*  TODO: investigate why this doesn't work:

                    'echo':     { ... }
                    'echo/foo': { ... }
             */
            'echo/:foo': { get: _.identity, post: () => $http.data.log },
 
            'api': {
                'source/:file': { get:  [this.requireDeveloper, this.allowOrigin ('*'), this.readSource],
                                  // post: [this.requireDeveloper, this.allowOrigin ('*'), this.receiveJSON, this.writeSource]
                                },
            /*  'git-commits':  { get:  [this.requireDeveloper, this.gitCommits] },
                'git-pull':     { post: [this.requireDeveloper, this.gitPull] }*/ } } },


    afterInit () { // remote logging
        if (this.messageToPeers) {
            _.onAfter (log.impl, 'defaultWriteBackend', params => {
                this.messageToPeers ({ what: 'log', params: params }, who => who.isAdmin && who.isDeveloper) }) } },

    /*  Access to the source code of server (requires developer privileges)
     */
    readSource () {

                    $http.headers['Content-Type'] =
                        $http.mime.guessFromFileName ($http.env.file)

                    const src = getSource (($http.env.file[0] === '/')
                                                ? $http.env.file
                                                : path.join (this.sourceRoot, $http.env.file))

                    if (src.error) {
                        throw src.error }

                    else {
                        return src.text } },

    // writeSource: function (input) {
    //                 return new Promise (then => {
    //                                         log.w ('Writing source:', $http.env.file)
    //                                         SourceFiles.write (
    //                                                 path.join (this.sourceRoot, $http.env.file),
    //                                                 input.text,
    //                                                 then.arity0) }) },

    /*  Git tools
     */
    /*gitLastCommitStatus: function (complete) {
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
        exec ('git pull', (e, stdout, stderr) => {
            if (e) {
                context.jsonFailure (e) }
            else {
                context.jsonSuccess () }

            this.restart () }) },*/

})