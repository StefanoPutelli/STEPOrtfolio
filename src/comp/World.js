import Home from "./Home";

export default function World(props) {

    return (
        <div id="layer1_background" style={{ height: props.X + "px", width: props.Y + "px" }} className={"cursor-grab relative"}>
            <div id="layer2_background" className="h-[100%] w-[100%]" >
                <canvas id="tileCanvas" height={props.Y} width={props.X} className="absolute top-0 left-0 h-[100%] w-[100%]" />
                <Home goClimb={props.goClimb} size={{
                    width: props.size.width,
                    height: props.size.height
                }}
                />
            </div>
        </div>
    );
}