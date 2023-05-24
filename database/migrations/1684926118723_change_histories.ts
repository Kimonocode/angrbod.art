import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
   this.schema.renameTable('categories', 'histories_categories')
  }

  public async down () {
    this.schema.renameTable('histories_categories','categories')
  }
}
