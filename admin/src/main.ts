import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerDocumentOptions, SwaggerModule} from "@nestjs/swagger";
import {SecuritySchemeObject} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle("Admin API")
      .setDescription("The Admin API")
      .setVersion("1.0")
      .addTag("admin")
      .addBearerAuth({type: "http", scheme: "Bearer", bearerFormat: "Token"} as SecuritySchemeObject, "Bearer")
      .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("api/v1/docs", app, document);

  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
