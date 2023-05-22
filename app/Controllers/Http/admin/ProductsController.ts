import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from '../../../Models/Product'
import AddProductValidator from '../../../Validators/AddProductValidator'

export default class ProductsController {

    public async index({view}: HttpContextContract){
        return view.render('admin/products')
    }

    public async store({request, view, session, response}: HttpContextContract){
        const payload = await request.validate(AddProductValidator)

        const product = new Product()

        await product.merge(payload).save()

        response.status(201)
        session.flash('success', 'Enregistrement validé.')
        return view.render('admin/products')
    }

}
