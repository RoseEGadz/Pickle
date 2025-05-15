import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router'

export default function Events() {
    const [events, setEvents] = useState([])
    const { id } = useParams();
    const [imgUrl, setImgUrl] = useState('')

    function getUrl() {
        let imgUrl = null
        if (id == 1) {
            imgUrl = 'https://static.vecteezy.com/system/resources/thumbnails/002/004/798/small/a-man-swimming-butterfly-vector.jpg'
        } else if (id == 2) {
            imgUrl = 'https://st4.depositphotos.com/2774203/23863/v/450/depositphotos_238632968-stock-illustration-backstroke-swim-sport-pool-competition.jpg'
        } else if (id == 3) {
            imgUrl = 'https://images.vexels.com/media/users/3/309119/isolated/preview/2b744adc2b02c2339cb8c74f8173fcba-close-up-of-a-swimmer-in-breaststroke.png'
        } else if (id == 4) {
            imgUrl = 'https://thumbs.dreamstime.com/b/circle-isolated-icon-logo-sport-swimming-swimmer-wave-water-blue-vector-187193130.jpg'
        } else {
            imgUrl = 'https://cbx-prod.b-cdn.net/COLOURBOX19380109.jpg?width=800&height=800&quality=70'
        }
        return imgUrl
    }

    useEffect(() => {
        async function getEvents() {
            try {
                const request = await fetch(`http://localhost:8000/api/${id}/events`)
                if (!request.ok) {
                    throw new Error(request.status)
                }
                const data = await request.json()
                const evies = data.filter(eve => eve.category_id == id)
                console.log(evies)
                setEvents(evies)
                const url = getUrl()
                setImgUrl(url)
            } catch(error) {
                console.error(error)
            }
        }
        getEvents()
    }, [])

    return (
    <>
    <h1>Select an Event to See Times and Note</h1>
    <img src={imgUrl} />
    <div className='events'>
    {events.map(eve => {
        let olympic = ''
        if (eve.olympic == true) {
            olympic = 'Meters:'
        } else {
            olympic = 'Yards:'
        }
        const linky = `/categories/${id}/events/${eve.id}`
        return (
            <Link to={linky} key={eve.id}>
            <button className='eve' key={eve.id}>{eve.name} {olympic}</button>
            </Link>
        )
    })}
    </div>
    <Link to='/categories'>
    <button>Back</button>
    </Link>
    </>
    )
}