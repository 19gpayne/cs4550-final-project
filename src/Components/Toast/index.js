export default function Toast({showToast, setShowToast}) {
    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="toast" className={`toast ${showToast ? "show" : ""}`}>
            <div className="toast-header">
                <strong className="me-auto">BookwormBuddy</strong>
                <button className="btn-close" onClick={() => setShowToast(false)}></button>
            </div>
            <div className="toast-body">
                Link copied to clipboard!
            </div>
            </div>
        </div>
    )
}