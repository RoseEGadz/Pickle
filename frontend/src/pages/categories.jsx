import { Link } from 'react-router'
import { useState, useEffect } from 'react'

export default function Categories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function getCategories() {

        try {
            const request = await fetch("http://localhost:8000/api/categories")
            if (!request.ok) {
                throw new Error(request.status)
            }
            const data = await request.json()
            setCategories(data)
        } catch(error) {
            console.error(error)
        }
    }
    getCategories()
    }, [])

    return (
    <>
    <h1>Event Categories</h1>
    {categories.map(cat => {
        let imgUrl = ''
        if (cat.id == 1) {
            imgUrl = 'https://static.vecteezy.com/system/resources/thumbnails/002/004/798/small/a-man-swimming-butterfly-vector.jpg'
        } else if (cat.id == 2) {
            imgUrl = 'https://st4.depositphotos.com/2774203/23863/v/450/depositphotos_238632968-stock-illustration-backstroke-swim-sport-pool-competition.jpg'
        } else if (cat.id == 3) {
            imgUrl = 'https://images.vexels.com/media/users/3/309119/isolated/preview/2b744adc2b02c2339cb8c74f8173fcba-close-up-of-a-swimmer-in-breaststroke.png'
        } else if (cat.id == 4) {
            imgUrl = 'https://thumbs.dreamstime.com/b/circle-isolated-icon-logo-sport-swimming-swimmer-wave-water-blue-vector-187193130.jpg'
        } else {
            imgUrl = 'https://cbx-prod.b-cdn.net/COLOURBOX19380109.jpg?width=800&height=800&quality=70'
        }
        let linky = `/categories/${cat.id}`
        return (
            <div key={cat.id}>
                <Link to={linky}>
                    <button className='cats'>{cat.name} Events:</button>
                </Link>
                <img src={imgUrl}></img>
            </div>
            )
        }
    )
        }
    <Link to="/">
    <button>Log Out</button>
    </Link>
    </>
    )
}