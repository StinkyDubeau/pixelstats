import { useState } from "react";
import ApiTest from "./components/ApiTest";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="bg-slate-200">
                <div className="py-4 px-10">

                    <div className="mx-auto my-4 max-w-screen-lg rounded-lg border-t-zinc-500 border-x-zinc-700 border-b-zinc-800 bg-zinc-100 border p-2 text-center shadow-lg">
                        <h1 className="text-3xl tracking-tighter">Pixelstats</h1>
                        <p className="tracking-wider">React version</p>
                    </div>

                    <div className="mx-auto flex gap-6 max-w-screen-lg">
                        <ApiTest />

                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
