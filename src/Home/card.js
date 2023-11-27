export default function Card(book) {
    return (
        <div className="col-5 card mb-3" key={book.id}>
            <div className="row g-0">
                <div className="col-md-4">
                <img src={book.cover_image} className="img-fluid rounded-start" alt={book.title} />
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{book.title} by {book.author}</h5>
                    <p className="card-text">{book.description}</p>
                    <p>{book.rating} / 5.00 stars</p>
                    <p className="card-text">
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
}