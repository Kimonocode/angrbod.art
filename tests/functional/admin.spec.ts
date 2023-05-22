import { test } from '@japa/runner'
import User from '../../app/Models/User'

test.group('Admin', () => {
  test('the user is redirected to the home page if he is not an admin', async ({client}) => {
    const user = await User.find(2)
    
    if(user === null) return

    const response = await client.get('/admin/dashboard').loginAs(user)
    
    response.assertRedirectsTo('/')
   
  })

  test('The user is correctly directed to the admin page if he is super user', async ({client}) => {
    const user = await User.find(1)
    
    if(user === null) return
    const response = await client.get('/admin/dashboard').loginAs(user)

    response.assertStatus(200)
    response.assertTextIncludes('<h1>Administration</h1>')
  })

  test('the user is redirected to the home page if he is not an admin for content page', async ({client}) => {
    const user = await User.find(2)
    
    if(user === null) return

    const response = await client.get('/admin/content').loginAs(user)
    
    response.assertRedirectsTo('/')
   
  })

  test('user can register new history', async ({client}) => {
    const user = await User.find(1)
    
    if(user === null) return

    const response = await client.post('/admin/content')
      .form({
        title:"Une nouvelle histoire",
        description:null,
        slug:"/une-nouvelle-histoire",
        read_time:5,
        content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem impedit necessitatibus sint repudiandae dicta nihil tempore in ipsa pariatur dolore minima quos sit nesciunt, quaerat alias asperiores eaque ut labore!"
      }).loginAs(user)

      response.assertStatus(200)
      response.assertFlashMessage('success', 'Enregistrement validé.')

  })

  test('user can\'t register new history if payload is bad', async ({client}) => {
    const user = await User.find(1)
    
    if(user === null) return

    const response = await client.post('/admin/content')
      .form({
        title:"",
        description:null,
        slug:"/une-nouvelle-histoire",
        read_time:"",
        content:""
      }).loginAs(user)

      response.assertStatus(200)
      response.assertFlashMissing('success')
  })

})
