import { useEffect } from 'react';
import { useParams, Link } from 'react-router'

export default function Events() {
    const [events, setEvents] = useState([])
    const { id } = useParams();

    useEffect(() => {
        async function getEvents() {
            try {
                const request = await fetch(`http://localhost:8000/api/${id}/events`)
                if (!request.ok) {
                    throw new Error(request.status)
                }
                const data = await request.json()
                setEvents(data)
            } catch(error) {
                console.error(error)
            }
        }
        getEvents()
    }, [])

    return (
    <>
    <h1>Events</h1>
    <Link to='/categories'>
    <button>Back</button>
    </Link>
    </>
    )
}