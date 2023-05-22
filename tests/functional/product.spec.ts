import { test } from '@japa/runner'
import User from '../../app/Models/User'

test.group('Products', () => {

  /**
   * User 1 is admin
   * User 2 is not admin
   */

  test('Access to the page is denied if the user is not logged in', async ({ client }) => {
    const response = await client.get('/admin/products')
    response.assertRedirectsTo('/connexion')
  })

  test('Access to the page is denied if the user is not admin', async ({ client }) => {
    const user = await User.find(2)
    if (user === null)
      return
    const response = await client.get('/admin/products').loginAs(user)
    response.assertRedirectsTo('/')
  })

  test('Access to products page if user is connected and admin', async ({ client }) => {
    const user = await User.find(1)
    if (user === null)
      return

    const response = await client.get('/admin/products').loginAs(user)
    response.assertStatus(200)
    response.assertTextIncludes('<h1>Gestion des produits</h1>')
  })

  test('Access to the page is denied if the user is not admin whit post request', async ({ client }) => {
    const user = await User.find(2)
    if (user === null)
      return

    const response1 = await client.post('/admin/products')
    const response2 = await client.post('/admin/products').loginAs(user)

      .form({
        title: "produit 1",
        description: "description du produit 1",
        slug: "/produit-01",
        price: 235,
        available: true,
        picture_url: "https://angrbod.art/produit1/photo",
      })
    response1.assertRedirectsTo('/connexion')
    response2.assertRedirectsTo('/')
  })

  test('Post Request whit bad payload', async ({ client }) => {
    const user = await User.find(1)
    if (user === null)
      return

    const response = await client.post('/admin/products').loginAs(user)
      .form({
        title: "",
        description: "",
        slug: "/produit-01",
        price:"",
        available: true,
        picture_url: "https://angrbod.art/produit1/photo",
      })
    response.assertFlashMissing('sucess')
  })

  test('The admin can add a product', async ({ client }) => {
    const user = await User.find(1)
    if (user === null)
      return

    const response = await client.post('/admin/products').loginAs(user)
      .form({
        title: "produit 1",
        description: "description du produit 1",
        slug: "/produit-01",
        price: 235.75,
        available: true,
        picture_url: "https://angrbod.art/produit1/photo",
      })
    response.assertStatus(201)
    response.assertFlashMessage('success', 'Enregistrement validé.')
  })

})
