import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { BookService } from "./book.service";
import { Response } from "express";
import { BookDto } from "./type/book.type";

@Controller('books')
export class BookController {
    constructor(private readonly appService: BookService) {}

    @Post()
    async getBooks(@Body() body: BookDto, @Res() res: Response): Promise<void> {
        try {
            const { seed, language, offset, limit, likes, review } = body;
            const books = await this.appService.getBooks(offset, limit, seed, language, likes, review);
            res.status(HttpStatus.OK).json({ message: 'Success', statusCode: HttpStatus.OK, books });
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: e.message, statusCode: HttpStatus.BAD_REQUEST });
        }
    }
}
