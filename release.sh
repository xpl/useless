./build.sh && git commit -a -m "$1" && git push && npm version patch && npm publish && git push
