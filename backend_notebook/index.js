const connectToMongo=require('./_db')
const express = require('express')
connectToMongo()

const app = express()
const port = 5000

app.use(express.json())
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/notes'))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})