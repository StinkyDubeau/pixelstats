import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Avatar from "./Avatar";
import Button from "./Button";

export default function PlayerCard(props) {
    const url = import.meta.env.VITE_HYPIXEL_API_URL;
    const key = import.meta.env.VITE_HYPIXEL_API_KEY;
    const options = {
        headers: {
            "Api-Key": key,
        },
    };

    const [data, setData] = useState();

    useEffect(() => {
        const ret = [];

        const getter = async () => {
            const response = await axios.get(`${url}${props.uuid}`, options);

            for (let key in response.data.player) {
                ret.push({
                    key: response.data.player[key],
                });
            }

            setData(ret);
        };
        getter();
    }, []);

    function createData(row) {
        return <>{row.key}</>;
    }

    return (
        <>
            <div className="m-5 max-w-sm rounded-xl border border-slate-400 bg-yellow-100 p-4">
                <div className="flex">
                    <Avatar uuid={props.uuid} />
                    <div>
                        <div>i am a playercard</div>
                        <p className="text-xs">UUID: {props.uuid}</p>
                    </div>
                </div>
                {/* <div className="text-wrap">{data && data.map(createData)}</div> */}
                <Button text="Click me"/>
            </div>
        </>
    );
}
