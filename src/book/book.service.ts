import { Injectable } from '@nestjs/common';
import { Book, Mock } from "./type/book.type";
import { InternalServerErrorException } from "@nestjs/common";
import * as seedrandom from 'seedrandom';

@Injectable()
export class BookService {
    performOperationNTimes(times: number) {
        try {
            let number = 0;
            const rng = seedrandom();

            const integerPart = Math.floor(times);
            const fractionalPart = times - integerPart;

            for (let i = 0; i < integerPart; i++) number++;
            if (rng() < fractionalPart) number++;

            return number;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async generateBooks(
        count: number,
        seed: number,
        language: 'en' | 'ru' | 'fr',
        offset: number,
        likes: number,
        review: number,
    ): Promise<Book[]> {
        const { book }: { book: Mock } = await import(`./mock/book.${language}`);
        const { faker } = await import(`@faker-js/faker/locale/${language}`);
        const { titles, authors, genres, publishers, descriptions, formats } = book;
        const books: Book[] = [];

        faker.seed(seed);

        for (let i = 0; i < count; i++) {
            books.push({
                index: i + 1 + offset,
                title: faker.helpers.arrayElement(titles),
                author: faker.helpers.arrayElement(authors),
                genre: faker.helpers.arrayElement(genres),
                publisher: faker.helpers.arrayElement(publishers),
                description: faker.helpers.arrayElement(descriptions),
                format: faker.helpers.arrayElement(formats),
                isbn: faker.commerce.isbn(),
                likes: this.performOperationNTimes(likes),
                review: this.performOperationNTimes(review),
            });
        }

        return books;
    }

    async getBooks(
        offset: number,
        limit: number,
        seed: number,
        language: 'en' | 'ru' | 'fr',
        likes: number,
        review: number
    ): Promise<Book[]> {
        return await this.generateBooks(limit, seed, language, offset, likes, review);
    }
}
