export default function Frame(props) {
    // Make this frame component the parent of all components on a page.
    // Declare (<Frame noNavbar/noCornerNav/noFooter/noPad>) to tune this behaviour.
    return (
        <div className="">
            <div className={!props.noPad && "m-auto max-w-[1280px] p-2 sm:p-6"}>
                <div className="text-center">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
