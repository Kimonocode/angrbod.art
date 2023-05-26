import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
       .notNullable()
       .unique()
      table.string('description')
       .notNullable()
      table.string('slug')
       .notNullable()
       .unique()
      table.string('banner_url')
       .notNullable()
      table.date('date_start')
       .notNullable()
      table.date('date_finish')
      table.integer('user_id')
       .notNullable()
       .unsigned()
       .references('users.id')
       .onDelete('CASCADE')
  
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
