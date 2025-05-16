import { Link, useParams } from 'react-router'
import { useEffect, useState } from 'react'

export default function Info() {
    const { id, id2 } = useParams()
    const backy = `/categories/${id}`
    const [imgUrl, setImgUrl] = useState('')
    const [note, setNote] = useState([])
    const [times, setTimes] = useState([])
    const [hidden, setHidden] = useState(false)
    const [show, setShow] = useState(false)
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

    const handleEdit = async (event) => {
        event.preventDefaut()
    };

    const handleAdd = () => {
        setHidden((prev) => !prev);
    };

    function handleClick(event) {
        event.preventDefault()
    };

    const handleShow = async () => {
        setShow((prev) => !prev)
    };

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
    {hidden && (
       <form>
       <textarea id='note'>{note.text}</textarea>
       <button className='edit' onClick={() => handleEdit('submit')}>Submit</button>
       </form>
    )}
    <h3>Feedback:</h3>
    <div className='feedback'><p>{note.text}</p></div>
    <button className='edit' onClick={() => handleShow()}>Edit</button>
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
    <button className='edit' onClick={() => handleAdd()}>{hidden ? 'Back Out' : 'Add Time'}</button>
    {hidden && (
        <form>
            <label htmlFor='time'>Time:</label>
            <input type='text' id='time' name='time' />
            <br></br>
            <label htmlFor='date'>Date: </label>
            <input type='date' id='date' name='date' />
            <br></br>
            <button className='edit' onClick={() => handleClick('submit')}>Submit</button>
            </form>
    )}
    <Link to={backy}>
    <button className='backy'>Back to Events</button>
    </Link>
    <Link to='/categories'>
    <button className='backy'>Back to Categories</button>
    </Link>
    </>
)
}