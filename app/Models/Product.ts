import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'

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
  public pictureUrl: string 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => ProductCategory)
  public categoryId: HasOne<typeof ProductCategory>
}
