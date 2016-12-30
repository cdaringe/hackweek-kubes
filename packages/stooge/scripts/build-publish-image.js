'use strict'

const cp = require('child_process')
const pkg = require('../package.json')

const tag = `cdaringe/stooge:${pkg.version}`
console.log(`building & publishing: ${tag} to the docker registry`)
cp.exec([
  `rm -rf node_modules/common`,
  `npm install`,
  `npm ls`,
  `docker build . -t ${tag}`,
  `docker push ${tag}`
].join(' && '))
