// This function will make our API calls and simplify the resulting data to
// filter only the keys that we care about.

// Getter(), when passed a uuid and an array of keys, will return an array
// of objects matching those keys.

// The function does not take a URL, instead it references your .env file for
// VITE_HYPIXEL_API_KEY and VITE_HYPIXEL_API_URL

import axios from "axios";

const url = import.meta.env.VITE_HYPIXEL_API_URL;
const key = import.meta.env.VITE_HYPIXEL_API_KEY;
const options = {
    headers: {
        "Api-Key": key,
    },
};

export default async function Getter(uuid, keys) {
    const ret = [];

    try {
        var response = await axios.get(`${url}${uuid}`, options);

        for(let key in response.data.player){
            ret.push(key);
        }
    } catch {
        console.log("Failed to make request to hypixel.")
    }

    return ret;
}
