import { useEffect } from "react";
import { useState } from "react";
import {
    JsonView,
    allExpanded,
    darkStyles,
    defaultStyles,
} from "react-json-view-lite";

import axios from "axios";

export default function ApiTest(props) {
    const url =
        "https://api.hypixel.net/v2/player?uuid=27166865-269a-4473-baa6-14110cf142bc";
    const key = import.meta.env.VITE_HYPIXEL_API_KEY;

    const [data, setData] = useState(null);

    // useEffect(() => {
    //     // Fetch data
    //     axios
    //         .get(url, {
    //             headers: {
    //                 "Api-Key": key,
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res.data.player);
    //             setData(res.data.player);
    //         })
    //         .catch((err) => console.error(err));
    // }, []);

    function showAllData(data) {
        return (
            <>
                <div className="">
                    <JsonView
                        data={data}
                        shouldExpandNode={allExpanded}
                        style={defaultStyles}
                    />
                </div>
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

    return (
        <>
            <div className="m-auto max-w-lg">
                <div>{data ? showAllData(data) : createLoading()}</div>
            </div>
        </>
    );
}
