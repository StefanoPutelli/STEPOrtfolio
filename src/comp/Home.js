import Typewriter from "./subComp/typewriter";
import gitHub from "../img/github.svg";
import cv from "../img/cv.png";
import cube from "../img/cube.png";

export default function Home() {

    return (
        <div className="relative block">
            <div className="w-screen m-auto" >
                <div className="m-auto w-screen text-center">
                    <div className="h-[20vh]">
                        <Typewriter textSize={"3vh"} minDelay={10} maxDelay={20} text1="Hi, my name is Stefano." text2="I am a Full-stack Developer" />
                    </div>
                </div>
                <div className="block top-[20vh] w-screen">
                    <img className="block m-auto w-[20vh] cursor-pointer" src={gitHub} alt="My github" onClick={() => {
                        window.open("https://github.com/StefanoPutelli/", "_blank");
                    }} />
                    <div style={{ display: 'block', color: "white", marginTop: "20px", width: "100%", fontFamily: "Source code pro", fontSize: 15, textAlign: "center" }} dangerouslySetInnerHTML={{ __html: "Check out my github to<br>follow my projects" }} />
                    <div className="block m-auto w-fit">
                        {/* <img className="inline h-[12vh] mt-5 cursor-pointer" src={cv} alt="CV" onClick={() => {
                            window.open("https://drive.google.com/file/d/1Knr0Q_yJuN6LXZ6u8p_Xy7lwKWCppt-X/view?usp=sharing", "_blank");
                        }} />
                        <div style={{ display: 'inline-block', color: "white", marginTop: "0%", fontFamily: "Source code pro", fontSize: 15, textAlign: "center", alignItems: "center" }} dangerouslySetInnerHTML={{ __html: "Here is my CV" }} /> */}
                        <img className="inline h-[12vh] mt-5 cursor-pointer" src={cube} alt="CV" onClick={() => {
                            window.open("https://www.stepo.cloud/webraycasting", "_blank");
                        }} />
                        <div style={{ display: 'inline-block', color: "white", marginLeft:"10px",marginTop: "0%", fontFamily: "Source code pro", fontSize: 15, textAlign: "center", alignItems: "center" }} dangerouslySetInnerHTML={{ __html: "Check out my<br>latest project" }} /> */
                    </div>
                    <div style={{ color: "white", marginTop: "40px", width: "100%", fontFamily: "Source code pro", fontSize: 15, textAlign: "center" }} dangerouslySetInnerHTML={{ __html: "Try to click on the background,<br>something cool will happen..." }} />
                </div>
            </div>
        </div>
    );
}