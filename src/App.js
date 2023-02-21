import { useEffect, useState } from "react";
import Typewriter from "./comp/typewriter";
import gitHub from "./img/github.svg";


function App() {

  const [screenResize, setScreenResize] = useState(false);

  useEffect(() => {
    var canvas = document.querySelector("#canvas")
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var config = {
      particleNumber: 100,
      maxParticleSize: 5,
      maxSpeed: 30,
      colorVariation: 255
    };
    var colorPalette = {
      bg: { r: 12, g: 9, b: 29 },
      matter: [
        { r: 36, g: 18, b: 42 }, // darkPRPL
        { r: 78, g: 36, b: 42 }, // rockDust
        { r: 252, g: 178, b: 96 }, // solorFlare
        { r: 253, g: 238, b: 152 } // totesASun
      ]
    };
    var particles = [], drawBg = function (ctx, color) {
      ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Particle Constructor
    var Particle = function (x, y) {
      // X Coordinate
      this.x = x || Math.round(Math.random() * canvas.width);
      // Y Coordinate
      this.y = y || Math.round(Math.random() * canvas.height);
      // Radius of the space dust
      this.r = Math.ceil(Math.random() * config.maxParticleSize);
      // Color of the rock, given some randomness
      this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
      // Speed of which the rock travels
      this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
      // Direction the Rock flies
      this.d = Math.round(Math.random() * 360);
    };
    var colorVariation = function (color, returnString) {
      var r, g, b, a;
      r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.r);
      g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.g);
      b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.b);
      a = Math.random() + .5;
      if (returnString) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
      } else {
        return { r, g, b, a };
      }
    };
    var updateParticleModel = function (p) {
      var a = 180 - (p.d + 90); // find the 3rd angle
      p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
      p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
      return p;
    };
    var drawParticle = function (x, y, r, c) {
      ctx.beginPath();
      ctx.fillStyle = c;
      ctx.arc(x, y, r, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    };
    var cleanUpArray = function () {
      particles = particles.filter((p) => {
        return (p.x > -100 && p.y > -100);
      });
    };
    var initParticles = function (numParticles, x, y) {
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y));
      }
      particles.forEach((p) => {
        drawParticle(p.x, p.y, p.r, p.c);
      });
    };
    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();
    var frame = function () {
      drawBg(ctx, colorPalette.bg);
      particles.map((p) => {
        return updateParticleModel(p);
      });
      particles.forEach((p) => {
        drawParticle(p.x, p.y, p.r, p.c);
      });
      window.requestAnimFrame(frame);
    };

    document.body.addEventListener("click", function (event) {
      var x = event.clientX,
        y = event.clientY;
      cleanUpArray();
      initParticles(config.particleNumber, x, y);
    });

    // First particle explosion
    initParticles(config.particleNumber);

    window.addEventListener('resize', () => {
      setScreenResize(!screenResize);
    });
    window.addEventListener("load", (event) => {
      frame();
    });

    return () => {
      window.removeEventListener('resize', () => {
        setScreenResize(!screenResize);
      });
      window.removeEventListener("load", () => {
        frame();
      });
    };

  }, [screenResize]);


  return (
    <div className="App">
      <canvas id="canvas"></canvas>
      <div className="absolute top-[20%] w-screen">
        <div className="m-auto w-screen text-center">
          <div className="h-[20vh]">
          <Typewriter minDelay={10} maxDelay={20} text1="Hy, my name is Stefano" text2="I am a Full-stack Developer" />
          </div>
          <img className="m-auto w-[20vh] cursor-pointer" src={gitHub} alt="My github" onClick={() => {
            window.open("https://github.com/StefanoPutelli/", "_blank");
          }} />
          <div style={{ display: 'inline-block', color: "white",marginTop: "30px" ,width:"100%",fontFamily: "Source code pro", fontSize: 15, textAlign: "center" }} dangerouslySetInnerHTML={{ __html: "Check out my github to follow my projects" }} />
        </div>
      </div>
      <div style={{ position:"absolute" ,bottom:"50px" , color: "white",marginTop: "30px" ,width:"100%",fontFamily: "Source code pro", fontSize: 15, textAlign: "center" }} dangerouslySetInnerHTML={{ __html: "Try to click on the background, something cool will happen..." }} />
    </div>
  );
}

export default App;
