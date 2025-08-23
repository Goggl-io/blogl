import { Hono } from 'hono'
import { sql } from "bun";

const app = new Hono()

app.get('/:slug', async (c) => {
  const {slug} = c.req.param()
  const user_id = 0

  const result = await sql`SELECT * from posts WHERE user_id = ${user_id} AND slug = ${slug} AND deleted = false ORDER BY created_at DESC;`.values();
  console.log(result)
  if (result.length !== 1) return c.html(<p>post not found <a href=".">home</a></p>, 404)
  const [id, deleted, description, content, created_at, title]: [number, boolean, string, string, Date, string] = result[0]

  return c.html(
    <main>
        <nav>
            <a href=".">home</a>
        </nav>
        <article>
            <div>
                <form method="post">
                    <input name="deleted" value="true" type="hidden"></input>
                    <input type="submit" value="delete"></input>
                </form>
            </div>
            <h1>{title}</h1>
            <p>{content}</p>
        </article>
    </main>
    )
})

app.post('/:slug', async (c) => {
    const {slug} = c.req.param()
    const user_id = 0

    const data = await c.req.formData()
    const { deleted } = Object.fromEntries(data)

    console.log(deleted)
    let insert = {

    };

    if (deleted) insert.deleted = true

    await sql`UPDATE posts SET ${sql(insert)} WHERE user_id = ${user_id} AND slug = ${slug}`;
    return c.html(<p>hi</p>)
})
export default app
