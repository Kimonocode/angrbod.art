import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import History from '../../../Models/History'
import AddHistoryValidator from '../../../Validators/AddHistoryValidator'

export default class ContentController {

    public async index({view}: HttpContextContract){

        return view.render('admin/content')
    }

    public async store({request, response, session}: HttpContextContract){

        const payload = await request.validate(AddHistoryValidator)

        const history = new History()
        await history.merge(payload).save()

        session.flash('success', "Enregistrement validé.")
        return response.status(200)
    }   
}
