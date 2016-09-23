/*	THE PROBLEM:
		
		Webpack2 now uses EventEmitter for message passing, while previous versions
		did use window.postMessage for that purpose. But the latest NPM release of
		WebpackDevServer still relies on postMessage thing.

	THE WORKAROUND:

		Translate messages posted via postMessage to EventEmitter messages.							*/

window.addEventListener ('message', function (event) {

	if ((typeof event.data === 'string') && (event.data.indexOf('webpackHotUpdate') === 0)) {
				
		var hash = event.data.replace ('webpackHotUpdate', '')
		console.info ('Re-emitting', hash)
		require("webpack/hot/emitter").emit ('webpackHotUpdate', hash)
	}
})