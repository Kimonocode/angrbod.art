import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from '../../../Models/Product'
import Drive from '@ioc:Adonis/Core/Drive'
import AddProductValidator from '../../../Validators/AddProductValidator'
import Application from '@ioc:Adonis/Core/Application'
import Picture from '../../../Models/Picture'

export default class ProductsController {

    public async index({view}: HttpContextContract){
        const products = await Product
            .query()
            .preload('pictures')
        return view.render('admin/products', {products})
    } 

    public async show({request, view}: HttpContextContract){
        const slug = request.param('slug')
        const product = await Product.findByOrFail('slug', `/${slug}`)
        await product.load('pictures')
        return view.render('admin/product', {product})
    }

    public async store({request, session, response, auth }: HttpContextContract){
        
        const payload  = await request.validate(AddProductValidator)
        const pictures = request.files('files')
        const product  = new Product()

        if (!pictures){
            return response.status(400)
                .send('Aucun fihier détecté')
        }

        const productSaved = await product
            .merge(payload)
            .save();

        try {
            for (let image of pictures) {
                const picture = new Picture()
                await image.move(Application.tmpPath('uploads'))
                picture.url = await Drive.getUrl(image.fileName!)
                picture.productId = productSaved.id
                await picture.save()
            }
            
            productSaved.userId = auth.user!.id
            await productSaved.save()

            session.flash('success', 'Enregistrement validé.')
            
            response.redirect('/admin/products', undefined, 201)

        } catch (error) {
            console.log(error)
            return response.status(400).send('Persistance impossible')
        }
    }
}
