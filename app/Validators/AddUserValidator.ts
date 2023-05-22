import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    'firstname': schema.string({}, [
      rules.maxLength(50),
      rules.minLength(3)
    ]),
    'lastname':schema.string({},[
      rules.maxLength(50),
      rules.minLength(3)
    ]),
    'email': schema.string({}, [
      rules.email(),
      rules.unique({table:'users',column:'email'}),
      rules.minLength(3)
    ]),
    'password':schema.string({}, [
      rules.confirmed('password_confirmed'),
      rules.minLength(8)
    ]),
  })

  public messages: CustomMessages = {
    required: 'Veuillez renseigner ce champ pour continuer.',
    'email':'Votre adresse amil est invalide.',
    'email.unique':'Cette adresse email est déjà utilisée pour un autre compte.',
    confirmed :'Les mots de passes ne correspondent pas.',
    'password.minLength': 'Le mot de passe doit contenir aux moins {{ options.minLength }} caractères.',
  }
}
