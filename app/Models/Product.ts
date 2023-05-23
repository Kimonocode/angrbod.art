import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'
import Picture from './Picture'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string | null

  @column()
  public slug: string

  @column()
  public price: number

  @column()
  public available: boolean

  @column()
  public userId: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => ProductCategory)
  public categoryId: HasOne<typeof ProductCategory>

  @hasMany(() => Picture)
  public pictures: HasMany<typeof Picture>
}
