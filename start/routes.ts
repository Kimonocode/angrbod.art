import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('home')

Route.get('/connexion', 'AuthController.login').as('login')
Route.get('/inscription', 'AuthController.signup').as('signup')
Route.get('/logout', 'AuthController.logout').as('logout')
Route.get('/compte/email/confirmation', 'AuthController.sendEmailConfirmation').as('email-confirmation')

Route.post('/inscription', 'AuthController.store')
Route.post('/connexion', 'AuthController.login')

// Auth Routes
Route.group(() => {

    Route.get('/me', 'ProfileController.index').as('me')

}).middleware('auth')

// Admin Routes
Route.group(() => {

    Route.get('/users', 'admin/UsersController.index').as('users')
    Route.get('/dashboard', 'admin/AdminController.index').as('admin')
    Route.get('/content', 'admin/ContentController.index').as('site-content')
    Route.get('/products', 'admin/products/ProductsController.index').as('admin-products')
    
    Route.get('/products/:slug', 'admin/products/ProductsController.show').as('admin-product')
    Route.get('/products/categories/:slug','admin/products/CategoriesController.show').as('admin-products-category')
    
    Route.post('/users', 'admin/UsersController.store')
    Route.post('/content', 'admin/ContentController.store')
    Route.post('/products', 'admin/products/ProductsController.store')
    Route.post('/products/categories', 'admin/products/CategoriesController.store')
    Route.put('/products/:id', 'admin/products/ProductsController.update')
    Route.delete('/products/:id', 'admin/products/ProductsController.destroy')
    Route.delete('/products/categories/:id', 'admin/products/CategoriesController.destroy')
})
.prefix('/admin')
.middleware(['auth', 'admin'])