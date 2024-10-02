import { serve } from '@hono/node-server'
import { Hono } from 'hono'
// Dynamically construct the path to the native module
const path = require('path'); // Use require instead of import
const nativeModulePath = path.join(__dirname, "../Reinforcements/@bunvader/rustacean");
const { fibonacci, sum } = require(nativeModulePath); // Use require() for native module
import { fibonacci2 } from './jsmod'


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// rs endpoint
app.get('/rust-rs', async (c) => {
  let val = fibonacci(30)
  return c.json({ msg: `RUST -> ${val}` }, 200)
})

app.get('/node-js', async (c) => {
  let val = fibonacci2(30)
  return c.json({ msg: `NODE -> ${val}` }, 200)
})

// rust fn()s
console.log(sum(2, 3))

const port = process.env.PORT || 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
