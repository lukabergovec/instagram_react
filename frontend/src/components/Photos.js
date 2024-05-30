import {useEffect, useState} from 'react';
import {Link, Navigate} from "react-router-dom";

function Photos() {
    const [photos, setPhotos] = useState([]);
    const [tags, setTags] = useState("");

    const searchByTags = () => {
        fetch("http://localhost:3001/photos/getByTags", {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({tags: tags}),
        }).catch((e) => console.log(e))
            .then((res) => res.json())
            .then((res) => {
                return res.filter((photo) => photo.disabled == false);
            })
            .then((res) => setPhotos(res))

    };

    useEffect(() => {
        fetch("http://localhost:3001/photos")
            .then((res) => res.json())
            .then((res) => {
                return res.filter((photo) => photo.disabled == false);
            })
            .then((res) => setPhotos(res));
    }, []);

    return (
        <div>
            <div className={"p-3"}>
                <h2>Find by tags</h2>
                <div>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => {
                            setTags(e.target.value);
                        }}
                        placeholder="input tags"
                    />
                    <button type="submit" onClick={searchByTags}>
                        Submit
                    </button>
                </div>
            </div>
            <div className={"p-3"}>
                <h3>Photos:</h3>
            </div>
            <ul>
                {photos.map(photo =>
                    <div className="card text-dark mb-2 w-25">
                        <h5 className="card-title">{photo.name}</h5>
                        <img
                            className="card-img"
                            src={"http://localhost:3001/" + photo.path}
                            alt={photo.name}
                        />
                        <h3>Posted by: {photo.postedBy.username}</h3>
                        <div>
                            <p>Date posted: {photo.date}</p>
                            <p>Likes: {photo.likes}</p>
                            <p>Tags: {photo.tags.map((el) => (
                                <>{el},</>
                            ))}
                            </p>
                        </div>
                        <Link to={"/img/" + photo._id}>More</Link>
                    </div>
                )}
            </ul>
        </div>
    );
}

export default Photos;