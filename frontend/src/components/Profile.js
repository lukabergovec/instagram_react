import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../userContext';
import {Navigate} from 'react-router-dom';

function Profile() {
    const userContext = useContext(UserContext);
    const [data, setData] = useState(null);

    useEffect(function () {
        const getProfile = async function () {
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const newdata = await res.json();
            setData(newdata);
        }
        getProfile();
    }, []);

    return (
        <div className={"p-3"}>
            {!userContext.user ? <Navigate replace to="/login"/> : ""}
            {data && (<>
                    <h1>User profile</h1>
                    <p>Username: {data.user.username}</p>
                    <p>Email: {data.user.email}</p>
                    <p>Total likes: {data.stats.totalLikes}</p>
                    <p>Total posts: {data.stats.totalPosts}</p>
                    <p>Total comments: {data.stats.totalComments}</p>
                </>
            )}
        </div>
    )
}

export default Profile;