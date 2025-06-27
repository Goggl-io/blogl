import { Hono } from 'hono'
import { sql } from "bun";

const app = new Hono()

app.get('/', async (c) => {
  const posts = await sql`SELECT * from posts WHERE deleted = false ORDER BY created_at DESC;`.values();
  console.log(posts)

  return c.html(
    <body>
      <header>
        <a href="create">+ post</a>
        {/*<h1>50 min YOUTUBE VIDEO WITH VOICE - GOGGLIO DAY 2</h1>*/}
        <h1><a href="/feeds/">feeds</a></h1>
      </header>
      <main>
        <ul>
          {posts.map(([id, deleted, description, content, created_at, title, slug]: [number, boolean, string, string, Date, string, string]) =>
            <a href={slug}>
              <li>
                <h3>{title}</h3>
                <p>{description}</p>
                <time>{created_at.toLocaleDateString()}</time>
              </li>
            </a>
          )}
        </ul>
      </main>
    </body>
    )
})


import slug from './posts/index'
app.route('/', slug)
import create from './create'
app.route('/create', create)
import feeds from './users/[userId]/feeds/index'
app.route('/feeds/', feeds)
export default app