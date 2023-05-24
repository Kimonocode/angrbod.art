import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products_categories'

  public async up () {
   this.schema.alterTable(this.tableName, table => {
    table.dropForeign('category_id')
   })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.integer('product_id')
      .unsigned()
      .references('product.id')
      .onDelete('CASCADE')
    })
  }
}
