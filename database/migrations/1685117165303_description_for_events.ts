import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('description')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.string('description')
    })
  }
}
