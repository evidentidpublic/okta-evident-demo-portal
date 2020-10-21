import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Welcome!</h1>
     <h3>Options include</h3>
    <nav>
    <ul>
        <li><Link to='/'>Home</Link></li>
        <br />
        <li><Link to='/signup'>Start an Identity Verification with Biometric Liveness Match</Link></li>
        <br />
        <li><Link to='/success'>Success Page</Link></li>
    </ul>
    </nav>
  </div>
)

export default Home
