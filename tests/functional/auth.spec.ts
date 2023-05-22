import { test } from '@japa/runner'
import User from '../../app/Models/User'

test.group('Auth', () => {
  test('Display Login Page', async ({client}) => {
    const response = await client.get('/connexion')
    response.assertStatus(200)
    response.assertTextIncludes('<h1>Connexion</h1>')
  })

  test('Display Signup Page', async ({client}) => {
    const response = await client.get('/inscription')
    response.assertStatus(200)
    response.assertTextIncludes('<h1>Devenir membre</h1>')
  })

  test('The user is redirected to "/connexion" if he is not logged in', async ({client}) => {
    const response = await client.get('/me')
    response.assertRedirectsTo('/connexion')
  })

  test('The user is redirected to "/connexion" if he is not logged in whit admin page', async ({client}) => {
    const response = await client.get('/admin/dashboard')
    response.assertRedirectsTo('/connexion')
  })

  test('User is redirected to "/me" after successful login', async ({client}) => {
    const user = await User.find(1)
    
    if(user === null){
      console.log('user dosn\'t exist.')
      return
    }
      const response = await client.get('/me').loginAs(user)
      response.assertStatus(200)
  })

  test('Login whit bad credentials', async ({client}) => {
    const response = await client.post('/connexion')
      .form({
        email:"notvalid@mail.com",
        password:"notvalidpassword"
      })
      response.assertStatus(401)
      response.assertFlashMissing('success')
      response.assertFlashMessage('error', "Adresse Email et/ou Mot de passe invalide.")
  })

  test('Display Email Confirmation', async ({client}) => {
    const response = await client.get('/compte/email/confirmation')
    response.assertStatus(200)
  })

  test('Registration whit bad credentials', async ({client}) => {
    const response = await client.post('/inscription')
      .form({
        firstname: "",
        lastname: "",
        email: "",
        password:"",
        passwordConfirmed: ""
      })

      response.assertStatus(200)
      response.assertFlashMissing('success')
  })

  test('Registration whit good credential', async ({client}) => {
    const response = await client.post('/inscription')
      .form({
        firstname: "Ronald",
        lastname: "Barloy",
        email: "hello5@ronaldbarloy.com",
        password:"ronaldbarloy",
        password_confirmed: "ronaldbarloy"
      })

      response.assertRedirectsTo('/compte/email/confirmation')
  })

  test('logout', async ({client}) => {
    const response = await client.get('/logout')
    response.assertStatus(200)
    response.assertRedirectsTo('/')
  })

})
