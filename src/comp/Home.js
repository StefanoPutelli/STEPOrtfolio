import Typewriter from "./utils/typewriter";
import gitHub from "../img/github.svg";
//import cv from "../img/cv.png";
import cube from "../img/cube.png";
import { useEffect } from "react";

export default function Home(props) {

    useEffect(() => {
        document.getElementById("Home").style.width = props.size.width + "px";
        document.getElementById("Text1").style.fontSize = props.size.width / 50 + "px";
        document.getElementById("Text2").style.fontSize = props.size.width / 50 + "px";
        document.getElementById("climbButton").style.width = props.size.width / 5 + "px";
        document.getElementById("climbButton").style.fontSize = props.size.width / 40 + "px";
    }, [props.size])

    return (
        <div id="Home">
            <div className="m-auto w-[100%] h-min text-center">
                <div className="h-[30%]">
                    <Typewriter textSize={props.size.width/35} minDelay={10} maxDelay={20} text1="Hi, my name is Stefano." text2="I am a Full-stack Developer" />
                </div>
            </div>
            <div className="block w-[100%]">
                <img className="block mt-5 m-auto w-[20%] cursor-pointer" src={gitHub} alt="My github" onClick={() => {
                    window.open("https://github.com/StefanoPutelli/", "_blank");
                }} />
                <div id="Text1" className={"block mt-4 text-white text-center justify-center"} style={{ fontFamily: "Source code pro" }} dangerouslySetInnerHTML={{ __html: "Check out my github to<br>follow my projects" }} />
                <div className="block m-auto w-[20%]">
                    {/* <img className="inline h-[12%] mt-5 cursor-pointer" src={cv} alt="CV" onClick={() => {
                            window.open("https://drive.google.com/file/d/1Knr0Q_yJuN6LXZ6u8p_Xy7lwKWCppt-X/view?usp=sharing", "_blank");
                        }} />
                        <div style={{ display: 'inline-block', color: "white", marginTop: "0%", fontFamily: "Source code pro", fontSize: 15, textAlign: "center", alignItems: "center" }} dangerouslySetInnerHTML={{ __html: "Here is my CV" }} /> */}
                    <img className="inline mt-5 cursor-pointer" src={cube} alt="WebRayCasting" onClick={() => {
                        window.open("https://www.stepo.cloud/webraycasting", "_blank");
                    }} />
                    <div className="w-[100%]">
                        <div id="Text2" className={"inline text-white ml-[10px] text-center justify-center text-"} style={{ fontFamily: "Source code pro" }} dangerouslySetInnerHTML={{ __html: "Check out my<br>latest project" }} />
                    </div>
                </div>
                <div id="climbButton" className="block m-auto">
                    <button className={"p-2 mt-5 w-[100%] bg-blue-900 text-white rounded-lg"} onClick={props.goClimb}>Go climb!</button>
                </div>
            </div>
        </div>
    );
}