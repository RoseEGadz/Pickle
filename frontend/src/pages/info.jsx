import { Link, useParams } from 'react-router'
import { useEffect, useState } from 'react'

export default function Info() {
    const { id, id2 } = useParams()
    const backy = `/categories/${id}`
    const [imgUrl, setImgUrl] = useState('')
    const [note, setNote] = useState([])
    const [times, setTimes] = useState([])
    const userId = 1

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

    function handleEdit() {}

    function handleAdd() {}

    useEffect(() => {
        async function getNoteAndTimes() {
            try {
                const request = await fetch(`http://localhost:8000/api/${id2}`)
                if (!request.ok) {
                    throw new Error(request.status)
                }
                const data = await request.json()
                const url = getUrl()
                setImgUrl(url)
                setTimes(data[0])
                console.log(times)
                setNote(data[1])
            } catch(error) {
                console.error(error)
            }
        }
        getNoteAndTimes()
    }, [])

    function timeConvert(time) {
        const totalMilliseconds = Math.round(time * 1000);
        let minutes = Math.floor(totalMilliseconds / (60 * 1000));
        let seconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
        let milliseconds = totalMilliseconds % 1000
        milliseconds = milliseconds / 10

        let new_time = `${minutes}:${seconds}.${milliseconds}`
        return new_time
    }

    return (
    <>
    <img src={imgUrl} />
    <textarea id='note'>{note.text}</textarea>
    <button className='edit' onClick={() => handleEdit()}>Edit</button>
    <div className='time-grid'>
        <div className='rows'>
            <div className='left'>Time</div>
            <div className='right'>Date</div>
        </div>
    {times.map(time => {
        return(
            <div className='rows' key={time.id}>
                <div className='left'>{timeConvert(time.time)}</div>
                <div className='right'>{time.date}</div>
            </div>
        )
    })}
    </div>
    <button className='edit' onClick={() => handleAdd()}>Add Time</button>
    <Link to={backy}>
    <button className='backy'>Back to Events</button>
    </Link>
    <Link to='/categories'>
    <button className='backy'>Back to Categories</button>
    </Link>
    </>
)
}