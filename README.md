# Use Less. Do More.
...Or Yet Another Useless JavaScript Library 

Was cut violently from a recent project of mine. It does not even compile, totally lacks documentation and pretty useless for now. Hence the name.

**::)**

Some code is formatted using tabs with tab width set to 4. GitHub does not allow to change tab size for repository viewer, so be prepared for creeped formatting when viewing the code via browser. Will fix that in future.

##Installing as NPM module

Copy useless folder to `node_modules` subfolder of your project. In this case the whole library will load as source which you can browse and/or edit. Edits are welcome!

##Installing as pre-built monolithic script

If you want to use only platform-independent part of the library, go to `build` folder and pick `useless-base.js`. This one is ready to be included to either server or client side.

More distribution options to come.

##Testing and building

Run `npm test` to run unit tests. Run `npm build` to produce compiled source (will go to build folder). Running build will invoke tests.