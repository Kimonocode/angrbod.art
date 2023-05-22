import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from '../../app/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        firstname: "Ronald",
        lastname: "Barloy",
        email: "hello@ronaldbarloy.com",
        password:"ronaldbarloy",
        isSuperUser:true
      },
      {
        firstname: "Ronald",
        lastname: "Barloy",
        email: "hello1@ronaldbarloy.com",
        password:"ronaldbarloy"
      }
    ])
  }
}
