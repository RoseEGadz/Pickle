import { Link } from 'react-router'

export default function Main() {
  return (
    <>
        <h1>Welcome to the Pickle!</h1>
        <h2>Where you can store of all of your swimming times and keep track of your coaches critiques.</h2>
        <img src="https://media.istockphoto.com/id/540365756/vector/swimming-man-splash-paint.jpg?s=612x612&w=0&k=20&c=ohaS3NjFLm6zqk5jFYNSwdkMCdrPqzsysgfIXguOWY8=" />
        <Link to='/categories'>
          <button>Log In</button>
        </Link>
    </>
  )
}