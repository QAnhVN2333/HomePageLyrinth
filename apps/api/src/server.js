import { createApp } from './app.js'

const port = Number(process.env.PORT ?? 8080)
const host = '0.0.0.0'
const app = createApp(port)

app.listen(port, host, () => {
  console.log(`Node API listening on ${host}:${port}`)
})

