import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>NotFound</h1>
            <Link to="/">Go back to homepage</Link>
        </div>
    )
}

export default NotFound
