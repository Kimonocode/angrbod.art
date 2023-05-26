import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Event extends BaseModel {
 
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string | null

  @column()
  public slug: string

  @column()
  public bannerUrl: string

  @column()
  public websiteUrl: string

  @column()
  public address: string

  @column()
  public isOnline: boolean

  @column()
  public userId: number

  @column.date({
    columnName: 'date_start',
    prepare: (v: DateTime) => v.toISO({ suppressMilliseconds: false, includeOffset: false }),
    serialize: (v: DateTime) => v.toISO({ suppressMilliseconds: false, includeOffset: false })
  })
  public dateStart: DateTime

  @column.date({
    columnName: 'date_finish',
    prepare: (v: DateTime) => v.toISO({ suppressMilliseconds: false, includeOffset: false }),
    serialize: (v: DateTime) => v.toISO({ suppressMilliseconds: false, includeOffset: false })
  })
  public dateFinish: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
