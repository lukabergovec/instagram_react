import {Navigate} from "react-router-dom";

function Photo({photo}) {
    return (
        <div>
            {(photo.disabled) ? <Navigate replace to="/"/> : ""}
            <div className="card text-dark mb-2 w-25">
                <img className="card-img" src={"http://localhost:3001/" + photo.path} alt={photo.name}/>
                <div className="card-img-overlay">
                    <h5 className="card-title">{photo.name}</h5>
                </div>
                <p>Date posted: {photo.date}</p>
                <p>Number of likes: {photo.likes}</p>
                <p>Number of reports: {photo.reports}</p>
                <p>Tags: {photo.tags.map((el) => (
                    <>{el},</>
                ))}</p>
            </div>
        </div>
    );
}

export default Photo;