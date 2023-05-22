import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.boolean('is_super_user')
      .defaultTo(false)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('is_super_user')
    })
  }
}
