export default function Frame(props) {
    return (
        <div className="bg-slate-900">
            <p>Frame</p>
            <div className="max-w-[1280px]">{props.children}</div>
        </div>
    );
}
