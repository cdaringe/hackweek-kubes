'use strict'

require('perish')
const common = require('common')
const STOOGE = process.env.STOOGE

if (!STOOGE) throw new Error('missing STOOGE name (e.g. curly, larry, moe)')

common.createServer(STOOGE)
