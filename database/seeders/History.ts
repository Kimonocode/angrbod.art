import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import History from '../../app/Models/History'

export default class HistorySeeder extends BaseSeeder {
  public async run () {
    History.createMany([
      {
        title:"L'histoire de Baldr et Loki",
        description:null,
        slug:"1-histoire-de-baldr-et-loki",
        readTime:5,
        isOnline:true,
        content: "Baldr, fils d'Odin et de Frigg, était le plus aimé de tous les dieux. Il était beau, gentil et généreux. Mais Loki, jaloux de la popularité de Baldr, décida de le tuer. Il fabriqua une flèche en gui, la seule chose qui pouvait tuer Baldr, et la donna à Hodr, le frère aveugle de Baldr, en lui faisant croire que c'était un jeu.Lorsque la flèche toucha Baldr, il mourut instantanément. Les dieux étaient dévastés et cherchèrent à se venger de Loki. Ils le capturèrent et le lièrent avec les entrailles de son propre fils, qui avait été transformé en loup. Loki souffrit ainsi jusqu'à la fin des temps."
      },
      {
        title:"L'histoire de Freydis Eiriksdottir",
        description:null,
        slug:"2-histoire-de-freydis-eiriksdottir",
        readTime:5,
        isOnline:true,
        content: "Freydis était la fille d'Erik le Rouge, le célèbre explorateur viking. Elle était connue pour son courage et sa détermination, et était respectée de tous les guerriers vikings. Un jour, Freydis et son époux, Torvard, partirent en expédition en Amérique du Nord. Mais ils furent attaqués par des autochtones, et tous les vikings furent tués, sauf Freydis. Elle se battit avec fureur, tuant de nombreux ennemis, jusqu'à ce qu'elle soit finalement capturée. Mais Freydis ne se laissa pas abattre. Elle réussit à s'échapper en tuant ses gardiens, et retourna en Islande. Là-bas, elle raconta son histoire à tous ceux qui voulaient l'entendre, et devint une légende parmi les guerriers vikings. Sa détermination et son courage inspirèrent de nombreuses générations de guerriers, et son nom est resté dans les annales de l'histoire viking"
      }
    ])
  }
}
