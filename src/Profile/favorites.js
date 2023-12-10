import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";

export default function Favorites({user, isUser, unfavorite}) {
    const favorites = user.favorites.map((favorite) => ({...favorite, isFavorite: true}));
    const reviews = user.reviews.map((review) => ({...review, isFavorite: false}));
    const favoritesAndReviews = [...favorites, ...reviews]
    .reduce((acc, current) => {
        const x = acc.find(item => item.book_key === current.book_key);
        const isFavoriteAndReview = acc.find(item => item.book_key === current.book_key && item.isFavorite && !current.isFavorite);
        if (!x) {
            return acc.concat([current]);
        } else {
            if (!isFavoriteAndReview) {
                return acc;
            } else {
                return acc.map(item => item.book_key === current.book_key ? {...current, isFavorite: true} : item);
            }
        }
    }, [])
    .sort((a, b) => {
        return a.book_title.localeCompare(b.book_title);
    })
    const getSmallerImage = (image) => {
        if (image) {
          return image.split("-M.jpg")[0] + "-S.jpg"
        }
    }
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">{isUser ? "Your" : user.first_name + "'s"} Favorites & Reviews</h5>
                <div className="card-text row">
                    {favoritesAndReviews.length === 0 && (
                        <>
                            <p className="lead text-center mb-1">No books here yet</p>
                            <Link to="/search" className="text-center">Search for books</Link>
                        </>
                    )}
                    {favoritesAndReviews.map((book) => (
                        <div className="mb-3 col-12 col-md-6 row d-flex mt-3">
                            <div className={`${book.book_image ? "col-2" : "col-3"} pe-0 text-end`}>
                                <img src={getSmallerImage(book.book_image)} className="img-fluid p-0 border-dark" alt={"No image"} />
                            </div>
                            <div className="col-9 d-flex">
                                <div>
                                    <div className="d-flex">
                                        <Link className="card-title" to={`/details/${book.book_key}`}>{book.book_title}</Link>
                                        {book.isFavorite && 
                                            <p 
                                                className="card-text text-primary ms-3" 
                                                role={`${isUser && "button"}`} 
                                                onClick={() => {if (isUser) unfavorite(book.book_key)}}
                                            >
                                                <FaHeart />
                                            </p>
                                        }
                                    </div>
                                    
                                    <div>
                                        {book.rating && <p className="card-text m-0"><b>{book.review_title} {book.rating}/5<FaStar /></b></p>}
                                        {book.review && <p className="card-text m-0">{book.review}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}