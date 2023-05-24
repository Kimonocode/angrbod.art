import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from '../../../../Models/Product'
import Drive from '@ioc:Adonis/Core/Drive'
import AddProductValidator from '../../../../Validators/AddProductValidator'
import Application from '@ioc:Adonis/Core/Application'
import Picture from '../../../../Models/Picture'
import ProductsCategory from '../../../../Models/ProductsCategory'
import UpdateProductValidator from '../../../../Validators/UpdateProductValidator'

export default class ProductsController {

    public async index({view}: HttpContextContract){
        const products = await Product
            .query()
            .preload('pictures')
        const categories = await ProductsCategory.all()

        return view.render('admin/products/products', {products, categories})
    } 

    public async show({request, view}: HttpContextContract){
        const slug = request.param('slug')
        const categories = await ProductsCategory.all()
        const product = await Product.findByOrFail('slug', `/${slug}`)
        await product.load('pictures')
        const productCategory = await ProductsCategory.findOrFail(product.productsCategoryId)
        return view.render('admin/products/product', {categories, product, productCategory})
    }

    public async store({request, session, response, auth }: HttpContextContract){
        
        const payload  = await request.validate(AddProductValidator)
        const pictures = request.files('pictures')
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
            productSaved.productsCategoryId = request.input('category')
            await productSaved.save()

            session.flash('success', 'Enregistrement validé.')
            
            response.redirect('/admin/products')

        } catch (error) {
            console.log(error)
            return response.status(400).send('Persistance impossible')
        }
    }

    public async update({request, session, response}: HttpContextContract){
        const payload  = await request.validate(UpdateProductValidator)
        let product: Product

        product = await Product.findOrFail(request.param('id'))
        product = await product.merge(payload).save()
        product.productsCategoryId = request.input('category')
        await product.save()

        session.flash('success','Produit Modifié')
        response.redirect(`/admin/products${product.slug}`)
    }

    public async destroy({request, response, session}: HttpContextContract){
        const id = request.param('id')
        const product = await Product.findOrFail(id)
        await product.delete()
        session.flash('success', 'Produit supprimé')
        return response.redirect('/admin/products')
    }
}
