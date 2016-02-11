ServerAppcache = module.exports = $trait ({

    api: function () {
            return {
                'appcache/manifest':    this.adminAccess (this.appcacheManifest),
                'appcache/versions.js': this.adminAccess (this.appcacheVersionsJS) } },


    appcacheVersions: function (complete) {
        this.gitLastCommitStatus (this.$ (function (commit) {
            this.db.counterValue ('history', function (lastHistoryUpdate) {
                complete ({ lastHistoryUpdate: lastHistoryUpdate, lastCodeUpdate: commit.hash }) }) })) },

    appcacheManifest: function (context) {
        this.appcacheVersions (this.$ (function (versions) {
            this.evalTemplate ('manifest.appcache', _.extend ({ enabled: serverConfig.appcache }, versions), function (text) {
                context.success (text, { 'Content-Type': 'text/cache-manifest', 'Pragma': 'no-cache', 'Cache-control': 'no-cache' }) }) })) },
    
    appcacheVersionsJS: function (context) {
        this.appcacheVersions (function (versions) {
            return context.success ('var appcacheVersions = ' + JSON.stringify (versions), { 'Content-Type': 'text/javascript' }) }) }

})