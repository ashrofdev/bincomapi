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

// db.select('*').from('announced_pu_results').then(data=>{
    
//     data.forEach(e=>{
//         if (e.party_abbreviation === 'PDP ') {
//             console.log(e)
//         }
//     })
// })


app.get('/results', (req, res)=>{
    const unit = []
    db.select('*').from('announced_pu_results').then(data=>{
        data.forEach(e=>{
            if (e.polling_unit_uniqueid === '8') {
                unit.push(e)
            }
        })
        res.json(unit)
    })
})


// app.get('/pdp', (req, res)=>{
//     const unit = []
//     db.select('*').from('announced_pu_results').then(data=>{
//         data.forEach(e=>{
//             if (e.party_abbreviation === 'PDP ') {
//                 unit.push(parseInt(e.party_score))
//             }
//         })
//         res.json(unit)
//     })
// })



app.get('/pdp', (req, res)=>{
    const units = {
        PDP: [],
        DPP: [],
        ACN: [],
        PPA: [],
        CDC: [],
        JP: [],
        ANPP: [],
        LABOUR: [],
        CPP: [],
    }
    db.select('*').from('announced_pu_results').then(data=>{
        data.forEach(e=>{
    
            if (e.party_abbreviation === 'PDP') {
                unit.PDP.push(parseInt(e.party_score))
            } else if (e.party_abbreviation === 'DPP') {
                unit.DPP.push(parseInt(e.party_score))
            }else if (e.party_abbreviation === 'ACN') {
                unit.ACN.push(parseInt(e.party_score))
            }else if (e.party_abbreviation === 'PPA') {
                unit.PPA.push(parseInt(e.party_score))
            }else if (e.party_abbreviation === 'CDC') {
                unit.CDC.push(parseInt(e.party_score))
            }else if (e.party_abbreviation === 'JP') {
                unit.JP.push(parseInt(e.party_score))
            }else if (e.party_abbreviation === 'ANPP') {
                unit.ANPP.push(parseInt(e.party_score))
            }else if (e.party_abbreviation === 'LABOUR') {
                unit.LABOUR.push(parseInt(e.party_score))
            }else if (e.party_abbreviation === 'CPP') {
                unit.CPP.push(parseInt(e.party_score))
            }
        })
    })
    res.json(units)
})


app.listen(process.env.PORT || 3001)