import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function Favorites({user, isUser, unfavorite}) {
    const getSmallerImage = (image) => {
        if (image) {
          return image.split("-M.jpg")[0] + "-S.jpg"
        }
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{isUser ? "Your" : user.first_name + "'s"} Favorites</h5>
                <div className="card-text row">
                    {user.favorites.length === 0 && (
                        <>
                            <p className="lead text-center mb-1">No books added to favorites yet</p>
                            <Link to="/search" className="text-center">Search for books</Link>
                        </>
                    )}
                    {user.favorites.map((book) => (
                        <div className="mb-3 col-12 col-md-6 row d-flex mt-3 align-items-center">
                            <div className={`${book.image ? "col-2" : "col-3"} pe-0 text-end`}>
                                <img src={getSmallerImage(book.image)} className="img-fluid p-0" alt={"No image"} />
                            </div>
                            <div className="col-9 d-flex">
                                <Link className="card-title" to={`/details/${book.key}`}>{book.title}</Link>
                                <h6 className="card-subtitle mb-2 text-muted me-3">{book.author}</h6>
                                {isUser && <p className="card-text text-primary" role="button" onClick={() => unfavorite(book.key)}><FaHeart /></p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}