export default function Comments({comments}) {
    return (
        <>
            {comments.map((el) => (
                <div className="p-5 border">
                    <p>{el.comm}</p>
                    <p>Posted by: {el.img_owner.username}</p>
                </div>
            ))}
        </>
    );
}