const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.post('/webhook', (req, res) => {

    req.body.entry.forEach(e => {
	event = e.messaging[0]
	console.log( e )
    })

    res.status(200).send()

})

app.get('/webhook', (req, res) => {
        console.log('on webhook get, req queries: ', req.query)
        let token = 'superrandomstring'

        if(req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == token) {
                console.log('verified!')
                res.status(200).send(req.query['hub.challenge'])
        } else res.status(403).send()


})

app.listen(3000, () => console.log( 'server running on port 3000' ))
