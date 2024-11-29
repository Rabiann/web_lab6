const express = require('express')
const app = express()
const port = 3000
const { fs, writeFileSync, readFileSync } = require("fs")
const { bodyParser, urlencoded } = require("body-parser")
const { join } = require("path");
const staticPath = join(__dirname, "public")
const listStoragePath = join(__dirname, "list.json")
const cors = require('cors')

// let clients = []

// function sendToAll(updatedList) {
//   for (const client of clients) {
//     client.res.write(`data: ${JSON.stringify(updatedList)}\n\n`)
//   }
// }

app.use(urlencoded({ extended: true }))
// app.use(express.static(staticPath))
app.use(cors())

// app.get("/sse", (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   res.setHeader('Content-Encoding', 'none');

//   res.write(`data: Connection established\n\n`)

//   const clientId = Date.now()

//   const newClient = {
//     id: clientId,
//     res
//   }

//   clients.push(newClient)

//   req.on('close', () => {
//     console.log("connection closed")
//     clients = clients.filter(client => client.id !== clientId)
//   })
// })

app.get('/getall', (_, res) => {
  const list = readFileSync(join(listStoragePath))
  const deserialized = JSON.parse(list)
  res.status(200).json(deserialized)
})

app.get('/create', async (req, res) => {
    const newNodeText = req.query.text
    const newNodeName = req.query.name
    const list = readFileSync(listStoragePath)
    const listDeserializad = JSON.parse(list);
    listDeserializad.push({
        name: newNodeName,
        text: newNodeText,
    })

    const listSerialized = JSON.stringify(listDeserializad)
    writeFileSync(listStoragePath, listSerialized)
    // sendToAll(listDeserializad)
    res.status(200).redirect("/control")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
console.log("built successfully")