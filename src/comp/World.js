import Home from "./Home";

export default function World(props) {

    return (
        <div id="childs" style={{ height: props.X + "px", width: props.Y + "px" }} className={"cursor-grab relative border-solid border-blue-900 border-8"}>
            <canvas id="tileCanvas" height={props.Y} width={props.X} className="absolute top-0 left-0 h-[100%] w-[100%]" />
            {/* <RayCaster width={500} height={500} right={400} top={center.x} /> */}
            <div className="centered_almost">
                <Home goClimb={props.goClimb} size={{
                    width: props.size.width,
                    height: props.size.height
                }} 
                />
            </div>
        </div>
    );
}