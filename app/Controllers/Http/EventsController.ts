import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductsCategory from '../../Models/ProductsCategory'
import Event from '../../Models/Event'

export default class EventsController {

    public async index({view}: HttpContextContract){
        const events = await Event.all()
        const collections = await ProductsCategory.all()
        return view.render('site/events', {collections, events})
    }

    public async show({request, view}: HttpContextContract){
        const slug = request.param('slug')
        const e = await Event.findBy('slug', `/${slug}`)
        return view.render('site/event', {e})
    }

    public store(){

    }
    
    public destroy(){

    }
}
