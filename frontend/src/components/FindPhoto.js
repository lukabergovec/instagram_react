import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Photo from "./Photo";
import AddComment from "./AddComment";
import Comments from "./Comments"
import {UserContext} from "../userContext";
import Button from "./Button";

export default function FindPhoto() {
    var {id} = useParams();
    const [data, setData] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/photos/" + id)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                return data;
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log("napaka!!!!");
            });
    }, []);

    const reportPhoto = () => {
        fetch('http://localhost:3001/photos/report/' + data.photo._id, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json()).then(res => console.log(res))
        data.photo.reports += 1
    }

    const like = () => {
        fetch('http://localhost:3001/photos/like/' + data.photo._id, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: data.photo._id})
        })
        setLiked(true);
        data.photo.likes += 1;
    }

    const dislike = () => {
        fetch('http://localhost:3001/photos/dislike/' + data.photo._id, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: data.photo._id})
        })
        setLiked(false);
        data.photo.likes -= 1;
    }

    return (
        <div className={"px-5 pb-5"}>
            {data && <Photo photo={data.photo} key={data.photo._id}/>}

            <UserContext.Consumer>
                {(context) =>
                    context.user ? (
                        <>
                            <div>
                                {data && (
                                    <div><h2>Like photo</h2>
                                        {liked && <Button text="dislike" onClick={dislike}/>}
                                        {!liked && <Button text="like" onClick={like}/>}
                                        <Button text="Report" onClick={reportPhoto}/>
                                    </div>
                                )}
                                {data && <AddComment post_id={data.photo._id}/>}
                            </div>
                        </>
                    ) : (
                        <>
                            <p>You must login to comment</p>
                        </>
                    )
                }
            </UserContext.Consumer>
            {data && <Comments comments={data.comment}/>}
        </div>
    );
}
