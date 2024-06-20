import { AppDataSource } from "../../data-source";
import { Training } from "../../entity/Training";
import { Acompanhamento } from "../../entity/Acompanhamento";
import { User } from "../../entity/User";
import { Image } from "../../entity/Image";
import sharp from 'sharp';

class AcompanhamentoService {



    async registrarAcompanhamentoCompleto(userId: number, imageId?: number) {
        const userRepository = AppDataSource.getRepository(User);
        const trainingRepository = AppDataSource.getRepository(Training);
        const imageRepository = AppDataSource.getRepository(Image);
        const acompanhamentoRepository = AppDataSource.getRepository(Acompanhamento);

        // Fetch the user and their trainings
        const user = await userRepository.findOne({ where: { id: userId }, relations: ["trainings"] });
        if (!user) {
            throw new Error("User not found");
        }

        // Determine the current day of the week
        const currentDate = new Date();
        const dayOfWeek = this.getDayOfWeekInPortuguese(currentDate);
        console.log('dayOfWeek: ')
        console.log(dayOfWeek)

        // Find the training for today
        const treinoDoDia = await trainingRepository.findOne({
            where: { user: user, date: dayOfWeek }
        });

        if (!treinoDoDia) {
            throw new Error("No training found for today");
        }

        // Register today's training as done
        const acompanhamento = new Acompanhamento();
        acompanhamento.data = currentDate;
        acompanhamento.taPago = true;
        acompanhamento.user = user;
        acompanhamento.training = treinoDoDia;
        if (imageId) {
            const image = await imageRepository.findOneBy({ id: imageId });
            if (image) {
                const imageBuffer = Buffer.from(acompanhamento.image.data);
                const processedImageBuffer = await sharp(imageBuffer)
                    .resize(200) // Ajuste o tamanho conforme necessário
                    .toFormat('jpeg') // Especifique o formato desejado
                    .toBuffer();
                acompanhamento.image.data = processedImageBuffer;

            }
        }
        await acompanhamentoRepository.save(acompanhamento);

        // Check for absences in the past 3 days
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const lastAcompanhamento = await acompanhamentoRepository.findOne({
            where: { user: user },
            order: { data: "DESC" }
        });

        if (!lastAcompanhamento || lastAcompanhamento.data < threeDaysAgo) {
            const faltasTreinos = user.acompanhamentos.filter(treino => treino.data <= new Date());
            for (const treino of faltasTreinos) {
                const falta = new Acompanhamento();
                falta.data = new Date();
                falta.taPago = false;
                falta.user = user;
                falta.training = treino.training;
                await acompanhamentoRepository.save(falta);
            }
        }

        return acompanhamento;
    }
    private getDayOfWeekInPortuguese(date: Date): string {
        const daysOfWeek = [
            'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
        ];
        return daysOfWeek[date.getDay()];
    }
}

export default new AcompanhamentoService();