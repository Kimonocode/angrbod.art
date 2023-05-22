import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EventsController {

    public index({view}: HttpContextContract){
        view.render('events')
    }

    public store(){

    }
    
    public destroy(){

    }
}
