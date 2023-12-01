import { FaExternalLinkAlt } from "react-icons/fa"
import {Link} from "react-router-dom"

export default function ListItem(book) {
    const details = book.book
    const coverImage = `http://covers.openlibrary.org/b/id/${details.cover_i}-M.jpg`

    return (
        <div className="col-5 card mb-3 p-0">
            <div className="row g-0 h-100">
                <div className="col-md-4">
                    {details.cover_i ?
                        <img src={coverImage} className="img-fluid rounded-start h-100" alt={details.title} />
                        :
                        <div className="bg-secondary text-white p-3 rounded-start h-100">
                            No image yet
                        </div>
                    }
                </div>
                <div className="col-md-8 d-flex justify-content-between flex-column">
                    <div className="card-body">
                        <h5 className="card-title">{details.title} by {details.author_name[0] ?? "Unknown"}</h5>
                        <p className="card-text">Published {details.first_publish_year}</p>
                        <p>{details.ratings_average ? `${details.ratings_average.toFixed(2)} / 5 stars` : "No ratings yet"}</p>
                        {details.last_modified_i && 
                            <div>Last updated {new Date(details.last_modified_i * 1000).toLocaleDateString()}</div>
                        }
                    </div>
                    <div className="d-flex justify-content-end m-3">
                        <Link to={`/search${details.key}`}><div className="float-end" role="button"><FaExternalLinkAlt /></div></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}