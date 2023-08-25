import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from '../../Models/Product'
import ProductsCategory from '../../Models/ProductsCategory'

export default class ProductsController {

    public async index({view}: HttpContextContract){
     const products = await Product.query()
        .preload('pictures')
     const collections = await ProductsCategory.all()
     return view.render('shop/products/products', {collections, products})
    }

}
