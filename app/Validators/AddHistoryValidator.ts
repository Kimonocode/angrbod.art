import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    'title': schema.string({}, [
      rules.maxLength(50),
      rules.minLength(3)
    ]),
    'slug': schema.string({}, [
      rules.unique({table:'histories',column:'slug'}),
      rules.minLength(3)
    ]),
    'read_time':schema.number(),
    'content': schema.string()
  })

  public messages: CustomMessages = {}
}
