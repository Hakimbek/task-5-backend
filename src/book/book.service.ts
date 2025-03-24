import { Injectable } from '@nestjs/common';
import { Book, Mock } from "./type/book.type";
import * as seedrandom from 'seedrandom';
import randomItem from "random-item";

@Injectable()
export class BookService {
    calculateLikes(times: number) {
        let number = 0;
        const rng = seedrandom();

        const integerPart = Math.floor(times);
        const fractionalPart = times - integerPart;

        for (let i = 0; i < integerPart; i++) number++;
        if (rng() < fractionalPart) number++;

        return number;
    }

    getReviews(times: number, reviews: { review: string; "review_author": string }[]) {
        let selectedReviews: { review: string; "review_author": string }[] = [];
        const rng = seedrandom();

        const integerPart = Math.floor(times);
        const fractionalPart = times - integerPart;

        for (let i = 0; i < integerPart; i++) selectedReviews.push(randomItem(reviews))
        if (rng() < fractionalPart) selectedReviews.push(randomItem(reviews))

        return selectedReviews;
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
        const { titles, authors, genres, publishers, descriptions, formats, reviews } = book;
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
                likes: this.calculateLikes(likes),
                review: this.getReviews(review, reviews),
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
