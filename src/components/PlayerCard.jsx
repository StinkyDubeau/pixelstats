import { useState } from "react";
import { useEffect } from "react";
import Getter from "../helpers/Getter";

export default function PlayerCard(props) {

    const [data, setData] = useState();

    useEffect(
        Getter(import.meta.env.VITE_EXAMPLE_UUID)
        .then((res) => {
            console.log(res);
            setData(res);
        })
    , []);

    return (
        <>
            <div>i am a playercard</div>
        </>
    );
}
