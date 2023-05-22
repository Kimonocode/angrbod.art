import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../../Models/User'
import AddUserValidator from '../../../Validators/AddUserValidator'

export default class UsersController {

    public index({view}: HttpContextContract){
        return view.render('admin/users')
    }

    public async store({ request, response, session, view}: HttpContextContract){

        const payload = await request.validate(AddUserValidator)

        const user = new User()
        await user.merge(payload).save()
            
        response.status(201)
        session.flash('success', {
            message: 'Enregistrement validé.'
        })

        return view.render('admin/users')
    }
}
