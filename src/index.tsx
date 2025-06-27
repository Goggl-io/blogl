import { Hono } from 'hono'
import { sql } from "bun";

const app = new Hono()

app.get('/', async (c) => {
  const userId = 1;
  const feeds = await sql`SELECT * from feeds WHERE user_id = ${userId};`.values();
  console.log(feeds)

  return c.html(
    <body>
      <header>
        <a href="create" class="bg-blue">add feed</a>
        <audio href=
      </header>
      <main>
        <h1 class="text">welcome to my blog</h1>
        <h1 class="text-3xl font-bold underline">
          Hello world!
        </h1>
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