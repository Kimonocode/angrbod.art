import { test } from '@japa/runner'
import User from '../../app/Models/User'

test.group('Users', () => {
    /**
   * User 1 is admin
   * User 2 is not admin
   */

    test('Access to the page is denied if the user is not logged in', async ({client}) => {
      const response = await client.get('/admin/users')
      response.assertRedirectsTo('/connexion')
    })
  
    test('Access to the page is denied if the user is not admin', async ({client}) => {
      const user = await User.find(2)
      if(user === null)
        return
      const response = await client.get('/admin/users').loginAs(user)
      response.assertRedirectsTo('/')
    })
  
    test('Access to users page if user is connected and admin', async ({client}) => {
      const user = await User.find(1)
      if(user === null)
        return
  
      const response = await client.get('/admin/users').loginAs(user)
      response.assertStatus(200)
      response.assertTextIncludes('<h1>Gestion des utilisateurs</h1>')
    })
})
