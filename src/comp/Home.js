import Typewriter from "./utils/typewriter";
import gitHub from "../img/github.svg";
//import cv from "../img/cv.png";
import cube from "../img/cube.png";
import { useEffect,useState } from "react";

export default function Home(props) {

    const [width, setWidth] = useState(props.size.width);

    useEffect(() => {
        setWidth(props.size.width);
    }, [props.size.width])

    return (
        <div className={"relative w-[" + width + "px]"}>
                <div className="m-auto w-[100%] h-[100%] text-center">
                    <div className="h-[30%]">
                        <Typewriter textSize={ props.size.width/20 + "px"} minDelay={10} maxDelay={20} text1="Hi, my name is Stefano." text2="I am a Full-stack Developer" />
                    </div>
                </div>
                <div className="block mt-10 top-[20%] w-[100%]">
                    <img className="block m-auto w-[20%] cursor-pointer" src={gitHub} alt="My github" onClick={() => {
                        window.open("https://github.com/StefanoPutelli/", "_blank");
                    }} />
                    <div className={"block mt-4 text-white text-center justify-center text-[" + props.size.width/35 + "px]"} style={{ fontFamily: "Source code pro" }} dangerouslySetInnerHTML={{ __html: "Check out my github to<br>follow my projects" }} />
                    <div className="block m-auto w-[20%]">
                        {/* <img className="inline h-[12%] mt-5 cursor-pointer" src={cv} alt="CV" onClick={() => {
                            window.open("https://drive.google.com/file/d/1Knr0Q_yJuN6LXZ6u8p_Xy7lwKWCppt-X/view?usp=sharing", "_blank");
                        }} />
                        <div style={{ display: 'inline-block', color: "white", marginTop: "0%", fontFamily: "Source code pro", fontSize: 15, textAlign: "center", alignItems: "center" }} dangerouslySetInnerHTML={{ __html: "Here is my CV" }} /> */}
                        <img className="inline mt-5 cursor-pointer" src={cube} alt="WebRayCasting" onClick={() => {
                            window.open("https://www.stepo.cloud/webraycasting", "_blank");
                        }} />
                        <div className="w-[100%]">
                        <div className={"inline text-white ml-[10px] text-center justify-center text-[100%]"} style={{ fontFamily: "Source code pro" }} dangerouslySetInnerHTML={{ __html: "Check out my<br>latest project" }} />
                        </div>
                    </div>
                    <div className="block m-auto w-[20%]">
                        <button className={"p-2 mt-5 w-[100%] bg-blue-900 text-white rounded-lg text-[100%]"} onClick={props.goClimb}>Go climb!</button>
                    </div>
                </div>
        </div>
    );
}