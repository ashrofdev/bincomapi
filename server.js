const express = require('express')
const nodemailer = require('nodemailer');
const knex = require('knex')
const bodyParser = require('body-parser')
const cors = require('cors')

// const db = knex({
//     client: 'pg',
//     connection: {
//       connectionString : process.env.DATABASE_URL,
//       ssl: true
//     }
// })
const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'test'
    }
})

const app = express()
app.use(bodyParser.json())
app.use(cors())




app.get('/results', (req, res)=>{
    db.select('*').from('announced_pu_results').then(daa=>{
        res.json(daa)
    })
})

app.listen(process.env.PORT || 3001)