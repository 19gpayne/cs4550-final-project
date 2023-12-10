import { FaExternalLinkAlt } from "react-icons/fa"
import {Link, useNavigate} from "react-router-dom"
import * as client from "../client"
import './index.css'

export default function ListItem(book) {
    const coverImage = `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    const navigate = useNavigate()

    const fetchBook = async () => {
        const key = book.edition_key[0]
        const fetchedBook = await client.findBookByKey(key);
        if (!fetchedBook) {
            const bookObj = {
                key: key,
                title: book.title,
                pub_date: book.first_publish_year,
                cover_image: book.cover_i ? coverImage : undefined,
                author: book.author_name[0] ?? "Unknown",
                avg_rating: book.ratings_average ?? undefined,
                reviews: []
            }
            await client.createBook(bookObj)
                .then((res) => {
                    navigate(`/details/${key}`)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            navigate(`/details/${key}`)
        }
    }

    return (
        <div className="col-12 col-lg-5 card mb-3 p-0">
            <div className="row g-0 h-100">
                <div className="wd-hidden-image col-12 col-md-4">
                    {book.cover_i ?
                        <img src={coverImage} className="rounded-start h-100" alt={book.title} />
                        :
                        <div className="bg-secondary text-white p-3 rounded-start h-100">
                            No image yet
                        </div>
                    }
                </div>
                <div className="col-md-8 d-flex justify-content-between flex-column wd-body float-end">
                    <div className="card-body">
                        <h5 className="card-title">{book.title} by {book.author_name ? book.author_name[0] : "Unknown"}</h5>
                        <p className="card-text">Published {book.first_publish_year}</p>
                        <p>{book.ratings_average ? `${book.ratings_average.toFixed(2)} / 5 stars` : "No ratings yet"}</p>
                        {book.last_modified_i && 
                            <div>Last updated {new Date(book.last_modified_i * 1000).toLocaleDateString()}</div>
                        }
                    </div>
                    <div className="d-flex justify-content-end m-3">
                        <Link onClick={fetchBook}><div className="float-end" role="button"><FaExternalLinkAlt /></div></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}