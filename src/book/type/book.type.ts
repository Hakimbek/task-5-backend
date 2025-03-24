export class Mock {
    genres: string[];
    authors: string[];
    titles: string[];
    publishers: string[];
    descriptions: string[];
    formats: string[];
    reviews: {
        review: string;
        "review_author": string;
    }[];
}

export class Book {
    index: number;
    genre: string;
    author: string;
    title: string;
    publisher: string;
    description: string;
    format: string;
    isbn: string;
    likes: number;
    review: {
        review: string;
        "review_author": string;
    }[];
}

export class BookDto {
    seed: number;
    language: 'en' | 'ru' | 'fr';
    offset: number;
    limit: number;
    likes: number;
    review: number;
}