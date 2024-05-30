function Button(props) {
    return(
        <button className="btn btn-primary m-2" onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default Button;