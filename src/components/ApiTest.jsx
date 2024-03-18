import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function ApiTest(props) {
    const url =
        "https://api.hypixel.net/v2/player?uuid=27166865-269a-4473-baa6-14110cf142bc";
    const key = import.meta.env.VITE_HYPIXEL_API_KEY;

    const [data, setData] = useState();

    useEffect(() => {
        // Fetch data
        axios.get(url, {
            headers: {
                "Api-Key": key
            }
        })
        .then((res) => {
            console.log(res.data.player);
            setData(res.data.player);
        })
        .catch((err) => console.error(err));
    }, []);

    function createData(data) {
        console.log(data);

        return(<>
            <p>i am data</p>
        </>)
    }

    return <h1>{createData()}</h1>;
}
