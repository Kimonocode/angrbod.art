import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from '../../../Models/Product'
import Drive from '@ioc:Adonis/Core/Drive'
import AddProductValidator from '../../../Validators/AddProductValidator'
import Application from '@ioc:Adonis/Core/Application'
import Picture from '../../../Models/Picture'


export default class ProductsController {

    public async index({view}: HttpContextContract){
        return view.render('admin/products')
    }

    public async store({request, session, response}: HttpContextContract){
        const payload = await request.validate(AddProductValidator)
        const product = new Product()

        product.title = payload.title
        product.description = payload.description
        product.slug = payload.slug
        product.price = payload.price
        product.available = true
        
        product.save()
        

        session.flash('success', 'Enregistrement validé.')
        response.status(201)
        return response.send('ok')
    }

}
