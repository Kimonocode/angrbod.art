import { test } from '@japa/runner'

test.group('Homepage', () => {
  test('display home page', async ({client}) => {
    const response = await client.get('/')
    response.assertStatus(200)
    response.assertTextIncludes('<h1 id="headline"><span>Medieval</span><span> Leather</span><span> Craft</span></h1>')
  })
})
