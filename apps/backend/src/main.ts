import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CoreErrorFilter } from './shared/core-error.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configuração de CORS
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization'
    });

    app.useGlobalFilters(new CoreErrorFilter());

    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

