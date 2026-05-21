import http from 'http'
import puppeteer from 'puppeteer'

let page

const server = http.createServer(async (req, res) => {
  try {
    const targetUrl = req.url.slice(1)

    if (!page) {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      page = await browser.newPage()
    }

    await page.goto(targetUrl, {
      waitUntil: 'networkidle2',
    })

    const text = await page.content()

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
    })

    res.end(text)
  } catch (err) {
    res.writeHead(500)
    res.end(err.message)
  }
})

const port = process.env.PORT || 3000
server.listen(port)
console.log('Server started at http://localhost:' + port)
