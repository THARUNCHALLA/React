import { useNavigate, useParams, useLocation, useMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const UserDetails = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const Page = queryParams.get("page") || 3
    console.log(queryParams)
    console.log(Page, "queryParams")
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/", { replace: true });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/users/${id}`
                );
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>{user.name}</h2>
                </div>
                <div className="card-body">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}</p>
                    <p><strong>Company:</strong> {user.company.name}</p>
                    <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary" onClick={handleBack}>
                        Back to Users
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;


// What the replace: true option does:
// When set to true, it replaces the current entry in the history stack instead of adding a new one

// This means the user won't be able to click "back" to return to this user details page

// Useful when you want to prevent users from returning to a specific view