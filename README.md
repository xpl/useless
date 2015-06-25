# Use Less. Do More.
...Or Yet Another Useless JavaScript Library 

Was cut violently from a recent project of mine. It does not even compile, totally lacks documentation and pretty useless for now. Hence the name.

**::)**

Some code is formatted using tabs with tab width set to 4. GitHub does not allow to change tab size for repository viewer, so be prepared for creeped formatting when viewing the code via browser. Will fix that in future.

##Installing as NPM module

Copy `useless` folder to `node_modules` subfolder of your project. In this case the whole library will load as source which you can browse and/or edit. Edits are welcome!

##Installing as pre-built monolithic script

If you want to use only platform-independent part of the library, go to `build` folder and pick `useless.js`. This one is ready to be included to either server or client side.

For minified version (with unit tests stripped) pick `useless.min.js`. This one is ready to be used in production setup.

##Building

Build command:

`node build.js <header-file> <output-folder>`

For building useless.js, run `node build.js useless ./build`. It will compile `useless.js` in root directory to `./build/useless.js`, and also will generate minified version `./build/useless.min.js` via Google Closure Compiler. There will be also intermediate file `./build/useless.stripped.js` with unit tests and comments stripped.

##Custom build

To make reduced version (with some submodules disabled), you can make your own version of `useless.js` file, commenting out unneeded `$include` directives. And then running build command to compile it.

There exists `useless-micro.js` as example of such reduced build. Running `node build.js useless.micro ./build` will produce `./build/useless.micro.min.js` as output.

##Automatic builds on source change

###Using external tools

You can run `build.js` under `nodemon` (which can be installed from npm). This will trigger automatic re-builds on source change. There also exists `.nodemonignore` which you can edit to exclude some files from monitoring.

`nodemon build.js <header-file> <output-folder>`

This will work for applications that dont rely on `useless/server` to implement app lifecycle.

##Using self-deployment protocol

Applications that are based on top of  `useless/server` can easily get this feature by adding following traits to main application component.

This will trigger test & build sequence on server startup, aborting startup if something goes wrong (with nice error reports).

```
$traits: [        
        require ('useless/server/exceptions'),
        require ('useless/server/tests'),
        require ('useless/server/deploy'),
```

For re-scheduling startup on source change, run your application under `nodemon` or `supervisor`.
