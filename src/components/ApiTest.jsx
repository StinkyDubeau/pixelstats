import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function ApiTest(props) {
    const url =
        "https://api.hypixel.net/v2/player?uuid=27166865-269a-4473-baa6-14110cf142bc";
    const key = import.meta.env.VITE_HYPIXEL_API_KEY;

    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data
        axios
            .get(url, {
                headers: {
                    "Api-Key": key,
                },
            })
            .then((res) => {
                console.log(res.data.player);
                setData(res.data.player);
            })
            .catch((err) => console.error(err));
    }, []);

    function createData(data) {
        console.log(`Data: ${data}`);

        return (
            <>
                <p>i am data</p>
            </>
        );
    }
    function createLoading() {
        return (
            <>
                <p>Loading data...</p>
            </>
        );
    }

    return <h1>{data ? createData(data) : createLoading()}</h1>;
}
