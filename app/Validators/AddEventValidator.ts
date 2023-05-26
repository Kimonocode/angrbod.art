import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    'title': schema.string({}, [
      rules.unique({table:'events',column:'title'}),
      rules.maxLength(50),
      rules.minLength(3)
    ]),
    'description':schema.string({}, [
      rules.maxLength(4000),
      rules.minLength(3)
    ]),
    'slug': schema.string({}, [
      rules.unique({table:'events',column:'slug'}),
      rules.minLength(3)
    ]),
    'website_url':schema.string({},[
      rules.url()
    ]),
    'date_start':schema.date({
      format:'sql'
    }),
    'date_finish':schema.date({
      format:'sql'
    }),
    'address':schema.string()
  })

  public messages: CustomMessages = {}
}
