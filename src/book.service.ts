import { Injectable } from '@nestjs/common';
import { Book } from './Book';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument } from './book.schema';
import { Model } from 'mongoose';

export interface SearchTerm {
  term: string
}

@Injectable()
export class BookService {
  private readonly bookshelf: Book[] = [];

  constructor(
    @InjectModel(BookDocument.name) private bookModel: Model<BookDocument>,
  ) {
  }

  async getAllBooks(): Promise<Book[]> {

    return await this.bookModel.find({}).sort({ title: 'asc' }).exec();
  }

  async addBook(book: Book): Promise<void> {
      await this.bookModel.create(book);
  }

  async getBook(title: string): Promise<Book> {
    return await this.bookModel.findOne({ title: title }).exec();

  }

  async getBooksOf(author: string): Promise<Book[]> {
    return await this.bookModel.find({ author: author }).exec();
  }

  async deleteBook(title: string): Promise<void> {
    await this.bookModel.deleteOne({ title: title }).exec();
  }

  async searchBook(searchterm: SearchTerm): Promise<Book[]> {
    return await this.bookModel.find({
      $or: [
        { title: { $regex: searchterm['term'], $options: 'i' } },
        { author: { $regex: searchterm['term'], $options: 'i' } }],
    }).exec();
  }

}
