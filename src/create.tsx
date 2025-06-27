import { Hono } from 'hono'

const app = new Hono()

import posts from './db'

app.get('/create', (c) => {
  return c.html(
    <body>
      <header>
        <a href=".">cancel</a>
      </header>
      <main>
        <form>
          <textarea></textarea>
          <button type="submit"></button>
        </form>
      </main>
    </body>
    )
})

app.post('/create', (c) => {
    return c.html(<h1>hi</h1>)
})

export default app