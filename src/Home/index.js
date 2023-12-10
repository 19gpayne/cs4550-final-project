import { useState } from "react";
import ListItem from "../Search/listitem";
import { useEffect } from "react";
import * as client from "../client";
import Spinner from "../Components/Spinner";

export default function Home() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [booksForYou, setBooksForYou] = useState([]); 
    const genres = ["fantasy", "non-fiction", "mystery", "romance", "horror"];
    const [fantasyBooks, setFantasyBooks] = useState([]);
    const [nonFictionBooks, setNonFictionBooks] = useState([]);
    const [mysteryBooks, setMysteryBooks] = useState([]);
    const [romanceBooks, setRomanceBooks] = useState([]);
    const [horrorBooks, setHorrorBooks] = useState([]);
    const fetchAccount = async () => {
        const account = await client.account();
        if (account) {
            setIsUserLoggedIn(true);
            if (account.favorites?.length > 0) {
                const recentFavorite = account.favorites[account.favorites.length - 1].key
                const getBook = await client.queryOpenLibrary(`q=${recentFavorite}&language=eng&limit=1`)
                if (getBook.data.docs[0].subject_key) {
                    const results = await client.queryOpenLibrary(`q=&language=eng&limit=4&subject=${getBook.data.docs[0].subject_key[1]}`)
                    setBooksForYou(results.data.docs)
                } else if (getBook.data.docs[0].author_name) {
                    const results = await client.queryOpenLibrary(`q=&author=${getBook.data.docs[0].author_name[0]}&language=eng&limit=4`)
                    setBooksForYou(results.data.docs)
                } else {
                    const results = await client.queryOpenLibrary(`q=&author=${getBook.data.docs[0].title}&language=eng&limit=4`)
                    setBooksForYou(results.data.docs)
                }
            } else {
                const results = await client.queryOpenLibrary(`q=&language=eng&limit=4&subject=popular&sort=rating`)
                console.log(results)
                setBooksForYou(results.data.docs)
            }
        } else {
            setIsUserLoggedIn(false);
        }
    };
    const getBooks = async () => {
        genres.forEach(async (genre) => {
            const results = await client.queryOpenLibrary(`q=&language=eng&limit=2&subject=${genre}&sort=rating`)
            switch (genre) {
                case "fantasy":
                    setFantasyBooks(results.data.docs)
                    break;
                case "non-fiction":
                    setNonFictionBooks(results.data.docs)
                    break;
                case "mystery":
                    setMysteryBooks(results.data.docs)
                    break;
                case "romance":
                    setRomanceBooks(results.data.docs)
                    break;
                case "horror":
                    setHorrorBooks(results.data.docs)
                    break;
                default:
                    break;
            }
        })
    }

    useEffect(() => {
        fetchAccount();
        getBooks()
    }, []);

    return (
      <div>
        <h1 className="mt-3">Bookworm Buddy</h1>
        <p className="lead">The #1 site for book reviews</p>

        {isUserLoggedIn && (
            <>
                <h3>Books for You</h3>
                <hr />
                <div className="mt-3 row gap-3 m-auto justify-content-center">
                    {booksForYou.length === 0 && <Spinner />}
                    {booksForYou.map((book) => {
                        return <ListItem key={book.title} {...book} />;
                    })}
                </div>
                <br />
            </>
        )}
        <h3>Top Rated Books</h3>
        <hr />
        <h4 className="mt-3 mb-4 ">Fantasy</h4>
        <div className="row gap-3 m-auto justify-content-center">
            {fantasyBooks.length === 0 && <Spinner />}
            {fantasyBooks.map((book) => {
                return <ListItem key={book.title} {...book} />;
            })}
        </div>
        <h4 className="my-4 ">Non-Fiction</h4>
        <div className="row gap-3 m-auto justify-content-center">
            {nonFictionBooks.length === 0 && <Spinner />}
            {nonFictionBooks.map((book) => {
                return <ListItem key={book.title} {...book} />;
            })}
        </div>
        <h4 className="my-4 ">Mystery</h4>
        <div className="row gap-3 m-auto justify-content-center">
            {mysteryBooks.length === 0 && <Spinner />}
            {mysteryBooks.map((book) => {
                return <ListItem key={book.title} {...book} />;
            })}
        </div>
        <h4 className="my-4 ">Romance</h4>
        <div className="row gap-3 m-auto justify-content-center">
            {romanceBooks.length === 0 && <Spinner />}
            {romanceBooks.map((book) => {
                return <ListItem key={book.title} {...book} />;
            })}
        </div>
        <h4 className="my-4 ">Horror</h4>
        <div className="row gap-3 m-auto justify-content-center">
            {horrorBooks.length === 0 && <Spinner />}
            {horrorBooks.map((book) => {
                return <ListItem key={book.title} {...book} />;
            })}
        </div>
      </div>
    );
}