export default function Button(props) {
    return (
        <button className="rounded-full border-b-4 border-pink-900 bg-pink-600 p-2 transition-all hover:bg-pink-500 hover:scale-105">
            <p className="mt-0.5 text-slate-300">{props.text}</p>
            {props.children}
        </button>
    );
}
