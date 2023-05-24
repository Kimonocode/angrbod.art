import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.renameColumn('category_id','products_category_id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.renameColumn('products_category_id','category_id')
    })
  }
}
