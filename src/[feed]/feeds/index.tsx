import { Hono } from 'hono'
import { sql } from "bun";

const app = new Hono()

app.get('/', async (c) => {
  const feeds = await sql`SELECT * from feeds;`.values();
  console.log(feeds)

  return c.html(
    <body>
      <header>
        <a href="create">+ feed</a>
      </header>
      <main>
        <ul>
          {feeds.map(([id, title, slug, user_id]: [number, boolean, string, string, Date, string, string]) =>
            <a href={slug}>
              <li>
                <h3>{title}</h3>
              </li>
            </a>
          )}
        </ul>
      </main>
    </body>
    )
})

export default app