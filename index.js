import http from 'http'

const server = http.createServer(async (req, res) => {
  try {
    const targetUrl = req.url.slice(1)

    const response = await fetch(targetUrl)
    const text = await response.text()

    res.writeHead(response.status, {
      'Content-Type': 'text/plain; charset=utf-8',
    })

    res.end(text)
  } catch (err) {
    res.writeHead(500)
    res.end(err.message)
  }
})

server.listen(process.env.PORT || 3000)
