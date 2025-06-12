import { useEffect, useState } from 'react'
import axios from "axios"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';

const User = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    
    const fetchData = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users")
            if (!Array.isArray(response.data)) {
                throw new Error("Invalid data format")
            }
            setData(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div className="container my-5">
            <h2 className="mb-4">User Details</h2>
            
            {loading ? (
                <Skeleton count={5} height={20} className="mb-3" />
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {data.map(user => (
                        <div key={user.id} className="col">
                            <div className="card h-100">
                                <Link to={`/users/${user.id}`}>
                                     <div className="card-body">
                                    <h5 className="card-title">{user.username}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{user.name}</h6>
                                    <div className="card-text">
                                        <p className="mb-1">
                                            <i className="bi bi-envelope me-2"></i>
                                            {user.email}
                                        </p>
                                        <p className="mb-1">
                                            <i className="bi bi-phone me-2"></i>
                                            {user.phone}
                                        </p>
                                        <p>
                                            <i className="bi bi-geo-alt me-2"></i>
                                            {user.address.city}
                                        </p>
                                    </div>
                                </div>
                                </Link>
                                <div className="card-footer">
                                    <small className="text-muted">User ID: {user.id}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default User