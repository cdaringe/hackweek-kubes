'use strict'

const express = require('express')
const axios = require('axios')
const qs = require('qs')
const cp = require('child_process')
const _ = require('lodash')
const map = _.map
const pickBy = _.pickBy
const includes = _.includes

const isDocker = process.env.IS_DOCKER
const STOOGES = {
  curly: { hostname: process.env.STOOGES_SERVICE_HOST || (isDocker ? 'curly' : 'localhost'), port: 6001 },
  larry: { hostname: process.env.STOOGES_SERVICE_HOST || (isDocker ? 'larry' : 'localhost'), port: 6002 },
  moe: { hostname: process.env.STOOGES_SERVICE_HOST || (isDocker ? 'moe' : 'localhost'), port: 6003 }
}
console.log('env:', process.env)

const BOPS = [
  'blamo', 'whamo', 'flick', 'poke', 'punch', 'slap', 'BOPSkie', 'smack', 'swing'
]

module.exports = {

  bop (stooge) {
    let bop = BOPS[0]
    let i = 0
    let randomIndex = Math.random()
    while (randomIndex > (1 / BOPS.length * (i + 1))) {
      ++i
      bop = BOPS[i]
    }
    return {
      stooge,
      hostname: cp.execSync('hostname').toString().replace(/\s/g, ''),
      timestamp: new Date().toISOString(),
      bop
    }
  },

configureRoutes ({ app, stooge }) {
    app.get('/', (req, res) => res.send('Greetings, stooge-master!  Did you need something?  GET /beep, perhaps?'))
    app.get('/beep', (req, res) => {
      const query = qs.parse(req.query)
      let toBop = query.toBop ? query.toBop : Object.keys(STOOGES)
      let bop = null
      if (includes(toBop, stooge)) {
        bop = this.bop(stooge)
        toBop = toBop.filter(stg => stg !== stooge)
      }
      return this.beepNeighbor(toBop)
      .then(bops => [ ...bops, bop ].filter(i => i))
      .then(bops => {
        console.log(`\tbopping complete! streaming bops...`)
        return bops
      })
      .then(res.send.bind(res))
    })
  },

  createServer (stooge) {
    const app = express()
    const { hostname, port } = STOOGES[stooge]
    this.configureRoutes({ stooge, app })
    app.listen(port, () => console.log(`${stooge} listening on port ${hostname}:${port}!`))
  },

  beepNeighbor (toBop) {
    if (!toBop.length) return Promise.resolve([])
    const conn = STOOGES[toBop[0]]
    const query = qs.stringify({ toBop })
    const uri = `http://${conn.hostname}:${conn.port}/beep?${query}`
    console.log(`\tbeeping: ${uri}`)
    return axios.get(uri)
    .then(({ data }) => data)
  },

  stooges: STOOGES
}
