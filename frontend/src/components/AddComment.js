import { useState } from 'react';
import Button from "./Button";

function AddComment({post_id}){
    const [comment, setComment] = useState('');
    function onSubmit(e){
        e.preventDefault();

        if(!comment){
            alert("Comment must not be empty");
        }

        const formData = new FormData();
        formData.append('comm',"comment");
        formData.append('img_id',"post_id");

        fetch('http://localhost:3001/comments', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comm: comment, img_id: post_id})
        }).then(()=>window.location.reload(true));
    }
    return(
        <div>
            <h2>Leave a comment</h2>
            <form className="form-group p-3">
                <input type="text" name="comment" placeholder="Comment something..."value={comment} onChange={(e)=>{setComment(e.target.value)}} />
                <Button text="Comment" onClick={onSubmit}/>
            </form>

        </div>
    )
}
export default AddComment;