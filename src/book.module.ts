import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookDocument, BookSchema } from './book.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://ubuoavpttld6esumas0e:cd3qLXFjelcsdIw0mLi@bikqqibdi7ahswmkamyy-mongodb.services.clever-cloud.com:2008/bikqqibdi7ahswmkamyy'),
    MongooseModule.forFeature([{name: BookDocument.name, schema: BookSchema},])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
