import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {

    public index({ view, auth }: HttpContextContract){
        const user = auth.user
        return view.render('auth/me', {
            title:"Bienvenue Viking",
            user
        })
    }

}