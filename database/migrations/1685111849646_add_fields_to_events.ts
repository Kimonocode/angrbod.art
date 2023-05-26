import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.string('website_url')
      table.boolean('is_online')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('website_url')
      table.dropColumn('is_online')
    })
  }
}
