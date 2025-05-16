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
    const [noteText, setNoteText] = useState('')
    const [timeText, setTimeText] = useState('')
    const [dateText, setDateText] = useState('')
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
        console.log('test before prevent default')
        event.preventDefault()
        console.log('test prevent default')
        const headers = {'Content-Type': 'application/json'}
        const body = JSON.stringify({
            text: noteText
        })
        // NOTE EDITOR
        try {
            const request = await fetch(`http://localhost:8000/api/${id2}/note`, {
                method: "POST",
                headers: headers,
                body: body,
            });
            console.log(noteText)
            if (!request.ok) {
                throw new Error(request.status)
            }
            handleShow()
            await getNoteAndTimes();
        } catch(error) {
            console.error(error)
        }
    };
    function toFloat(timeString) {
        const match = /^(\d+):(\d+\.\d+)$/.exec(timeString);
        if (!match) {
            return NaN
        };
        let minutes = parseInt(match[1], 10);
        let seconds = parseFloat(match[2]);
        let float = minutes * 60 + seconds;
        return float
    }

    const handleAdd = () => {
        setHidden((prev) => !prev);
    };

    const handleClick = async (event) => {
        event.preventDefault()
        const headers = {'Content-Type': 'application/json'};
        const time = toFloat(timeText);
        const body = JSON.stringify({
        time: time,
        date: dateText
    });
    console.log(dateText)
        // TIME ADDER
        try {
            const request = await fetch(`http://localhost:8000/api/${id2}/times`, {
                'method': 'Post',
                headers: headers,
                body: body
            })
            if (!request.ok) {
                throw new Error(request.status)
            }
            handleAdd()
            await getNoteAndTimes();
        } catch(error) {
            console.error(error)
        }
    };

    const handleShow = () => {
        setShow((prev) => !prev)
    };

    async function getNoteAndTimes() {

            try {
                const request = await fetch(`http://localhost:8000/api/${id2}`)
                if (!request.ok) {
                    throw new Error(request.status)
                }
                const data = await request.json()
                setImgUrl(getUrl)
                setTimes(data[0])
                setNote(data[1])
            } catch(error) {
                console.error(error)
            }
        }

    useEffect(() => {
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

    <h3>Feedback:</h3>
    <div className='feedback'><p>{note.text}</p></div>
    <button className='edit' onClick={() => handleShow()}>{show ? 'Back Out' : 'Edit'}</button>
    {show && (
       <form onSubmit={handleEdit}>
       <textarea id='note' onChange={(event) => setNoteText(event.target.value)} defaultValue={note.text} />
       <button className='edit' type='submit'>Submit</button>
       </form>
    )}
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
        <form onSubmit={handleClick}>
            <label htmlFor='time'>Time:</label>
            <input type='text' id='time' name='time' onChange={(event) => setTimeText(event.target.value)} />
            <br></br>
            <label htmlFor='date'>Date: </label>
            <input type='date' id='date' name='date' onChange={(event) => setDateText(event.target.value)} />
            <br></br>
            <button className='edit' type='submit'>Submit</button>
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