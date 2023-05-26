import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Picture from '../../../../Models/Picture'
import Product from '../../../../Models/Product'

export default class ProductsPicturesController {

    public async destroy({request, response, session}: HttpContextContract){
        const product = await Product.findOrFail(request.param('productId'))
        const image = await Picture.findOrFail(request.param('pictureId'))
        await image.delete()
        session.flash('success', 'Image supprimée.')
        return response.redirect(`/admin/products${product.slug}`)
    }
}
