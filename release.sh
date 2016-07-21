git pull origin master
node build.js no-supervisor
git commit -a -m "$1"
npm version patch
npm publish
git push origin HEAD:master
