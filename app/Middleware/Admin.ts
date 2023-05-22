import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Redirect User to "/" if user is not admin
 */
export default class Admin {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {

    const user = await auth.use('web').authenticate()
    if(!user.isSuperUser)
      return response.redirect('/')

    await next()
  }
}
