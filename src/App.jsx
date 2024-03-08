import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="m-4">
                <div className="mx-auto max-w-screen-lg rounded-full bg-zinc-100 p-2 text-center shadow-lg">
                    <h1 className="text-3xl tracking-tighter">Pixelstats</h1>
                    <p className="tracking-wider">React version</p>
                </div>
            </div>
        </>
    );
}

export default App;
