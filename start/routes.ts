import Route from '@ioc:Adonis/Core/Route'

// Site
Route.get('/', 'HomeController.index').as('home')
Route.get('/evenements-medievaux', 'EventsController.index').as('events')
Route.get('/evenements-medievaux/:slug', 'EventsController.show').as('event')

// Shop
Route.get('/collections/tous-les-produits','ProductsController.index').as('products')

// Auth
Route.get('/connexion', 'AuthController.login').as('login')
Route.get('/inscription', 'AuthController.signup').as('signup')
Route.get('/logout', 'AuthController.logout').as('logout')
Route.get('/compte/email/confirmation', 'AuthController.sendEmailConfirmation').as('email-confirmation')

Route.post('/inscription', 'AuthController.store')
Route.post('/connexion', 'AuthController.login')

Route.group(() => {

    Route.get('/me', 'ProfileController.index').as('me')

}).middleware('auth')

// Admin 
Route.group(() => {

    Route.get('/users', 'admin/UsersController.index').as('users')
    Route.get('/dashboard', 'admin/AdminController.index').as('admin')
    Route.get('/content', 'admin/ContentController.index').as('site-content')
    Route.get('/products', 'admin/products/ProductsController.index').as('admin-products')
    Route.get('/events', 'admin/EventsController.index').as('admin-events')
    Route.get('/events/:slug', 'admin/EventsController.show').as('admin-event')
    
    Route.get('/products/:slug', 'admin/products/ProductsController.show').as('admin-product')
    Route.get('/products/categories/:slug','admin/products/CategoriesController.show').as('admin-products-category')
    Route.get('/order/products/categories', 'admin/products/CategoriesController.index').as('admin-products-categories')
    
    Route.post('/users', 'admin/UsersController.store')
    Route.post('/events', 'admin/EventsController.store')
    Route.post('/content', 'admin/ContentController.store')
    Route.post('/products', 'admin/products/ProductsController.store')
    Route.post('/products/categories', 'admin/products/CategoriesController.store')
    
    Route.put('/products/:id', 'admin/products/ProductsController.update')
    Route.put('/products/categories/:id', 'admin/products/CategoriesController.update')

    Route.delete('/products/:id', 'admin/products/ProductsController.destroy')
    Route.delete('/products/categories/:id', 'admin/products/CategoriesController.destroy')
    Route.delete('/products/:productId/image/:pictureId', 'admin/products/ProductsPicturesController.destroy')
})
.prefix('/admin')
.middleware(['auth', 'admin'])