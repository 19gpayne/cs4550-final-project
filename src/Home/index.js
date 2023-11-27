import Nav from "../Navigation";
import { useState } from "react";
import {bookList} from "../Database/books"
import Card from "./card";

export default function Home() {
    const [books, setBooks] = useState(bookList);
    const isUserLoggedIn = true;
    return (
      <div className="container">
        <Nav />
        <h1 className="mt-3">Bookworm Buddy</h1>
        <p className="lead">The #1 site for book reviews</p>

        {isUserLoggedIn && (
            <>
                <h3>Books for You</h3>
                <div className="row gap-5 m-auto justify-content-center">
                    {books.slice(0, 4).map((book) => {
                        return <Card key={book.title} {...book} />;
                    })}
                </div>
            </>
        )}
        <br />
        <h3>Top Rated Books</h3>
        <div className="row gap-5 m-auto justify-content-center">
            {books.slice(4, 10).map((book) => {
                return <Card key={book.title} {...book} />;
            })}
        </div>
      </div>
    );
}