import Typewriter from "./utils/typewriter";
import gitHub from "../img/github.svg";
//import cv from "../img/cv.png";
import cube from "../img/cube.png";

export default function Home(props) {
    return (
        <div id="Home" className="h-screen w-screen relative">
            <div className="absolute top-[50%] translate-y-[-50%] w-[100%]">
                <div className="m-auto w-[100%] h-min text-center">
                    <div className="h-[30%]">
                        <Typewriter minDelay={10} maxDelay={20} text1="Hi, my name is Stefano." text2="I am a Full-stack Developer" />
                    </div>
                </div>
                <div className="block w-[100%]">
                    <img className="block mt-5 m-auto w-[20vh] cursor-pointer" src={gitHub} alt="My github" onClick={() => {
                        window.open("https://github.com/StefanoPutelli/", "_blank");
                    }} />
                    <div id="Text1" className={"block mt-4 text-white text-center justify-center text-[2vh]"} style={{ fontFamily: "Source code pro" }} dangerouslySetInnerHTML={{ __html: "Check out my github to<br>follow my projects" }} />
                    <div className="block m-auto">
                        <div className="block m-auto w-fit">
                            <a href="/webraycasting"><img className="mt-5 cursor-pointer h-[20vh]" src={cube} alt="WebRayCasting" /></a>
                        </div>
                        <div className="w-[100%]">
                            <div id="Text2" className={"text-white text-center m-auto text-[1.8vh]"} style={{ fontFamily: "Source code pro" }} dangerouslySetInnerHTML={{ __html: "Check out my<br>latest project" }} />
                        </div>
                    </div>
                    {/* <div id="climbButton" className="block m-auto">
                    <button className={"p-2 mt-5 w-[100%] bg-blue-900 text-white rounded-lg"} onClick={props.goClimb}>Go climb!</button>
                </div> */}
                </div>
            </div>
        </div>
    );
}