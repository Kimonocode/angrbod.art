import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminController {

    public async index({view, auth, response}: HttpContextContract){

        const user = await auth.use('web').authenticate()

        if(!user.isSuperUser)
            return response.redirect('/')

        return view.render('admin/home')
        
    }
}
