import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    'title': schema.string({}, [
      rules.maxLength(50),
      rules.minLength(3)
    ]),
    'description':schema.string({}, [
    ]),
  })

  public messages: CustomMessages = {}
}
