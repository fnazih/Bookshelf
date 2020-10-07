import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './Book';
import {SearchTerm} from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks(@Query() queryElements){
    if("author" in queryElements)
      return this.bookService.getBooksOf(decodeURIComponent(queryElements["author"]));
    return this.bookService.getAllBooks();
  }

  @Post()
  addBook(@Body() book: Book){
    if((book["author"] == undefined) || (book["title"] == undefined) || (book["date"] == undefined))
    {
      throw new BadRequestException();
    }
    const newBook: Book = {author: book["author"], title: book["title"], date: book["date"]};
    this.bookService.addBook(newBook);
    return newBook;
  }

  @Post(':search')
  searchBook(@Body() searchTerm: SearchTerm){
    return this.bookService.searchBook(searchTerm);
  }

  @Get('/:title')
  getBook(@Param('title') title: string){
    return this.bookService.getBook(title);
  }

  @Delete('/:title')
  deleteBook(@Param('title') title: string){
    this.bookService.deleteBook(title);
  }
}
