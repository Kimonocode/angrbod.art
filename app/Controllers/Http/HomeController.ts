import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {

    public index({view}: HttpContextContract){
        return view.render('home', {
            title:"Angrbod'Art | Medieval Leather Craft"
        })
    }

}
