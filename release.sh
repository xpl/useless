./build.sh && git commit -a -m "$1" && npm version patch && npm publish && git push
