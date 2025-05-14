import { Link } from 'react-router'

export default function Info() {
    return (
    <>
    <h1>Event Times and note area</h1>
    <Link to='/categories/:id'>
    <button>Back to Events</button>
    </Link>
    </>
)
}