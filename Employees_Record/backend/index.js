const connectToMongo = require('./db');

const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use('/api/employees',require('./routes/EmployeeRoutes'))

app.listen(port, () => {
  console.log(`employee backend listening on port http://localhost:${port}`)
})

