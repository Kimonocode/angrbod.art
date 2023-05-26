import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '../../../Models/Event'
import AddEventValidator from '../../../Validators/AddEventValidator'
import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'

export default class EventsController {

    public async index({view}: HttpContextContract){
        const events = await Event.all()
        return view.render('admin/events/events', {events})
    }
   
    public async store({request, response, session, auth}: HttpContextContract){
        const banner = request.file('banner')
        const user = await auth.authenticate()
        const payload = await request.validate(AddEventValidator)
        let event: Event
        
        if(!banner)
            return response.send('banner is required');

        event = new Event()

        await banner.move(Application.tmpPath('uploads'))
        event.bannerUrl = await Drive.getUrl(banner.fileName!)
       
        event.isOnline = true
        event.userId = user.id
        event.slug = payload.slug
        event.title = payload.title
        event.address = payload.address
        event.websiteUrl = payload.website_url
        event.description = payload.description
        
        event.dateStart = payload.date_start
        event.dateFinish = payload.date_finish
        
        await event.save()
        
        session.flash('success', 'Événements enregistré.')
        return response.redirect('/admin/events')
    }

    public async show({request, view}: HttpContextContract){
        const slug = request.param('slug')
        const event = await Event.findByOrFail('slug', `/${slug}`)
        return view.render('admin/events/event', {event})
    }

}
