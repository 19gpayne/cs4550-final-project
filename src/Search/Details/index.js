import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import * as client from '../../client';
import {useNavigate} from 'react-router-dom';
import { FaAngleLeft, FaHeart, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Toast from '../../Components/Toast';
import Tooltip from '../../Components/Tooltip';

export default function Details() {
    const {id} = useParams();
    const [book, setBook] = useState();
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [user, setUser] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [review, setReview] = useState("")

    const fetchAccount = async () => {
        const account = await client.account();
        if (account) {
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
        setUser(account);
        if (account.favorites?.find((favorite) => favorite.key === id)) {
            setIsFavorite(true);
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
            const response = 
            await client.updateUser({...user, 
                favorites: user.favorites.filter((favorite) => favorite.key !== id)
            });
            setIsFavorite(false);
        } else {
            const response = 
            await client.updateUser({...user, 
                favorites: [...user.favorites, {key: id, title: book.title, image: book.cover_image}]
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
                        <div className="col-3">
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
                        <div className="col-1">
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
                                <Toast showToast={showToast} setShowToast={setShowToast} />  
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3>Reviews</h3>
                                {isUserLoggedIn ? 
                                    <button className="btn btn-primary" disabled={!isUserLoggedIn}>+ Add Review</button>
                                    :
                                    <Link to="/login">Login to add review</Link>
                                } 
                            </div>
                            <hr />
                            {book.reviews.length > 0 ? (
                                book.reviews.map((review) => (
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">{review.title}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{review.author}</h6>
                                            <p className="card-text">{review.body}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No reviews yet</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}