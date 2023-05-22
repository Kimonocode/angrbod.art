import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import AddUserValidator from '../../Validators/AddUserValidator'

export default class AuthController {

    public async login({ auth, request, response, session, view }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        if (request.method() === 'GET') {
            return view.render('auth/login', {
                title: "Ravi de te revoir Viking ! | Angrbod'Art"
            })
        }
    
        try {
            await auth.use('web').attempt(email, password)
            return response.redirect('/me')
        } catch {
            session.flash('error', "Adresse Email et/ou Mot de passe invalide.")
            response.status(401)
            return view.render('auth/login', {
                title: "Invalid Credential | Angrbod'Art"
            })
        }
    }

    public signup({ view }: HttpContextContract) {
        return view.render('auth/signup', {
            title: "Devenir membre du Grand Skali | Angrbod'Art"
        })
    }

    public async store({ request, response }: HttpContextContract) {

        const payload = await request.validate(AddUserValidator)

        const user = new User()
        user.merge(payload).save()
        
        response.redirect('/compte/email/confirmation')
    }

    public async logout({response, auth}: HttpContextContract){
        await auth.logout()
        response.redirect('/')
    }

    public sendEmailConfirmation({view}: HttpContextContract){
        return view.render('auth/email-confirmation')
    }
}
