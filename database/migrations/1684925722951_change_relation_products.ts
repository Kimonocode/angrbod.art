import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products_categories'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.renameColumn('category_id', 'product_id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.renameColumn('product_id','category_id')
    })
  }
}
