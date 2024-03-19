import axios from "axios";

export default function Avatar(props) {
    console.log(`https://playerdb.co/api/player/minecraft/${props.uuid}`)

    return(
        <>
            <img src={`https://crafatar.com/renders/body/${props.uuid}`} alt="X's player avatar."/>
        </>
    )
}