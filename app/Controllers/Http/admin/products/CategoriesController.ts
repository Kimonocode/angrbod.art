import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductsCategory from '../../../../Models/ProductsCategory'
import AddProductsCategoryValidator from '../../../../Validators/AddProductsCategoryValidator'
import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'


export default class CategoriesController {

    public async show({request, view}: HttpContextContract){
        const slug = request.param('slug')
        const category = await ProductsCategory.findByOrFail('slug', `/${slug}`)
        await category.load('products', product => {
            product.preload('pictures')
        })
        return view.render('admin/products/category', {category})
    }

    public async store({request, response, session}: HttpContextContract){
        const payload = await request.validate(AddProductsCategoryValidator)
        const banner = request.file('banner')
        const category = new ProductsCategory()

        const saved = await category.merge(payload).save()
        if(banner){
            await banner.move(Application.tmpPath('uploads'))
            saved.pictureUrl = await Drive.getUrl(banner.fileName!)
            await saved.save()
        }
        session.flash('success', 'Catégorie enregistrée')
        return response.redirect().toRoute('admin-products')
    }

    public async destroy({request, response, session}: HttpContextContract){
        const id = request.param('id')
        const category = await ProductsCategory.findOrFail(id)
        await category.delete()
        session.flash('success', 'Catégorie supprimée')
        return response.redirect('/admin/products')
    }
}
