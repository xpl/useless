git pull origin master && ./build.sh && git commit -a -m "$1" && npm version patch && npm publish && git push origin HEAD:master
