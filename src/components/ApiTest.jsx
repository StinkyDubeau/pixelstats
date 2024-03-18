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

    function createEntry(key) {
        console.log("Creating a key");
        return (
            <>
                <p>{`${key}, ${data[key]}`}</p>
            </>
        );
    }

    function showAllData(data) {
        console.log(`Data: ${data}`);

        // This should be a map but map is not working for some reason.
        // It's not working because it's an object, not an array. Maybe let's make a function that just blindly converts object to array? I don't really care about the JSON structure, anyways.
        for (let key in data) {
            createEntry(key);
        }

        return (
            <>
                <p>Showing all data...</p>
                <p>{data.map}</p>
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

    return <h1>{data ? showAllData(data) : createLoading()}</h1>;
}
