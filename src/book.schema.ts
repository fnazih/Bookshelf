import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({collection: 'books-EB'})
export class BookDocument extends Document {

  @Prop()
  author: string;
  @Prop()
  date: Date;
  @Prop()
  title: string;

}


export const BookSchema = SchemaFactory.createForClass(BookDocument);