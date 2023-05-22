import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pictures'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
     table.integer('product_id')
      .references('products.id')
      .unsigned()
      .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
