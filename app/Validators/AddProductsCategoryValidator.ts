import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddProductsCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    'title': schema.string({}, [
      rules.maxLength(50),
      rules.minLength(3)
    ]),
    'slug': schema.string({}, [
      rules.unique({table:'products_categories',column:'slug'}),
      rules.minLength(3)
    ]),
  })

  public messages: CustomMessages = {}
}
