import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import * as client from '../../client';
import {useNavigate} from 'react-router-dom';
import { FaAngleLeft, FaHeart, FaRegHeart, FaRegShareSquare, FaStar, FaPen } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Toast from '../../Components/Toast';
import Tooltip from '../../Components/Tooltip';
import NumberInput from '../../Components/Inputs/numberInput';
import {getFormattedDate} from '../../utils';

export default function Details() {
    const {id} = useParams();
    const [book, setBook] = useState();
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [user, setUser] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isReviewing, setIsReviewing] = useState(false);
    const [userReviewed, setUserReviewed] = useState(false);
    const [review, setReview] = useState({rating: 1})

    const fetchAccount = async () => {
        const account = await client.account();
        if (account) {
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
        setUser(account);
        if (account.favorites?.find((favorite) => favorite.book_key === id)) {
            setIsFavorite(true);
        }
        if (account.reviews?.find((review) => review.book_key === id)) {
            setUserReviewed(true);
            const review = account.reviews.find((review) => review.book_key === id);
            setReview({review_title: review.review_title, review: review.review, rating: review.rating});
        }
      };
  
      useEffect(() => {
        fetchAccount();
      }, []);

    const fetchBook = async () => {
        const fetchedBook = await client.findBookByKey(id);
        if (!fetchedBook) {
            navigate('/search');
        }
        setBook(fetchedBook);
    }
    
    const addFavorite = async () => {
        if (isFavorite) {
            await client.updateUser({...user, 
                favorites: user.favorites.filter((favorite) => favorite.book_key !== id)
            });
            setIsFavorite(false);
        } else {
            await client.updateUser({...user, 
                favorites: [...user.favorites, {book_key: id, book_title: book.title, book_image: book.cover_image}]
            });
            setIsFavorite(true);
        }
    }

    const share = async () => {
        navigator.clipboard.writeText(window.location.href);
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false);
          }, 5000);
    }

    const resetReview = () => {
        setIsReviewing(false);
        if (userReviewed) {
            const review = user.reviews.find((review) => review.book_key === id);
            setReview({review_title: review.review_title, review: review.review, rating: review.rating});
        } else {
            setReview({rating: 5});
        }
    }

    const saveReview = async () => {
        const time = new Date().toISOString();  
        const updatedBook = {
            ...book,
            reviews: [...book.reviews, 
                {
                    review_title: review.review_title, 
                    review: review.review, 
                    rating: review.rating, 
                    userID: user._id, 
                    username: user.username,
                    user_role: user.role,
                    timestamp: time
                }]
        }
        await client.updateBook(updatedBook);
        const updatedUser = {
            ...user,
            reviews: [
                ...user.reviews,
                {
                    book_key: book.key, 
                    book_title: book.title,
                    book_image: book.cover_image,
                    timestamp: time,
                    review_title: review.review_title, 
                    review: review.review, 
                    rating: review.rating, 
                }
            ]
        }
        await client.updateUser(updatedUser);
        await fetchBook();
        await fetchAccount()
        resetReview()
    }

    useEffect(() => {
        fetchBook();
    }, []);

    return (
        <div>
            <div className="row mt-3">
                <div className="col-12">
                    <div className="link-primary text-decoration-underline" role="button" onClick={() => window.history.back()}>
                        <FaAngleLeft /> Back
                    </div>
                </div>
            </div>
            {book && (
                <div>
                    <div className="row mt-5">
                        <div className="col-md-3 col-4">
                            {book.cover_image ?
                                <img src={book.cover_image} className="img-fluid h-100" alt={book.title} />
                                :
                                <div className="bg-secondary text-white p-3 h-100">
                                    No image yet
                                </div>
                            }
                        </div>
                        <div className="col-8">
                            <h1>{book.title}</h1>
                            <h3>by {book.author}</h3>
                            <p>Published {book.pub_date}</p>
                            <p>{book.avg_rating ? `${parseFloat(book.avg_rating).toFixed(2)} / 5 stars` : "No ratings yet"}</p>
                        </div>
                        <div className="col-md-1">
                            <div className="d-flex justify-content-center align-items-center gap-3">
                                {isUserLoggedIn ?
                                    <div className="text-primary" role="button" onClick={addFavorite}>
                                        {isFavorite ? <FaHeart size={21} /> : <FaRegHeart size={21} />}
                                    </div>
                                    :
                                    <Tooltip text="Login to favorite">
                                        <div className="text-secondary">
                                            <FaRegHeart size={21} />
                                        </div>
                                    </Tooltip>
                                }
                                <div className="text-primary" role="button" id="toastbtn" onClick={share}><FaRegShareSquare size={21} /></div>
                                <Toast showToast={showToast} setShowToast={setShowToast} message={"Link copied to clipboard!"} />  
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3>Reviews</h3>
                                {isUserLoggedIn ? 
                                    <button className="btn btn-primary" disabled={!isUserLoggedIn} onClick={() => setIsReviewing(true)}>{userReviewed ? "Edit Review" : "+ Add Review"}</button>
                                    :
                                    <Link to="/login">Login to add review</Link>
                                } 
                            </div>
                            <hr />
                            {isReviewing ? 
                                (
                                    <>
                                        <h5>Write Review</h5>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="title" value={review.review_title} onChange={(e) => setReview({...review, review_title: e.target.value})} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="body" className="form-label">Body</label>
                                            <textarea className="form-control" id="body" value={review.review} onChange={(e) => setReview({...review, review: e.target.value})} />
                                        </div>
                                        <div className="mb-3">
                                            <NumberInput label="Rating / 5 *" value={review.rating ?? 1} setValue={(value) => setReview({...review, rating: value})} min={1} max={5} step={1} />
                                        </div>
                                        <div className="float-end d-flex mb-3">
                                            <button className="btn btn-light border" onClick={resetReview}>Cancel</button>
                                            <button className="btn btn-primary ms-2" onClick={saveReview}>Submit</button>
                                        </div>
                                    </>
                                )
                                :
                                <>
                                    {book.reviews.length > 0 ? (
                                        book.reviews.map((review) => (
                                            <div className="card mb-3" key={review._id}>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <h6 className="card-subtitle mb-2 text-muted d-flex align-items-center"><Link to={`/profile/${review.userID}`}>@{review.username}</Link>&nbsp;gave this book {review.rating ?? 1}/5<FaStar /></h6>
                                                        <p className="card-text align-items-center d-flex">
                                                            {getFormattedDate(review.timestamp)} 
                                                        </p>
                                                    </div>
                                                    <h5 className="card-title">{review.review_title}</h5>
                                                    <p className="card-text">{review.review}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>No reviews yet</div>
                                    )}
                                </>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}