import { useEffect, useRef, useState } from "react";
import Home from "./Home";
import Bg from "./subComp/animBg";
import drawTiles from "./drawTiles";

const X = "3000";
const Y = "3000";

const TILE_SIZE = 50;

const climb_start = 800;
const climb_width = 400;

export default function World() {

    const [loaded, setLoaded] = useState(false);
    const timeOnLoad = useRef(0);
    const grubbing = useRef(false);

    const scrollable = useRef(null);

    const tiles = useRef(null);

    const center = getScrollCenter()
    const pos = useRef({ x: 0, y: 0, left: center.x, top: center.y });

    function getScrollCenter() {
        let x = X / 2 - window.innerWidth / 2;
        let y = Y / 1.9 - window.innerHeight / 3;
        return { x, y }
    }

    function getTime() {
        return Date.now() - timeOnLoad.current;
    }

    function checkIfGrabbable(tiles,x,y,size){
        console.log(x,y)
        for(let i = 0; i < tiles.length; i++){
            if(tiles[i].x < x && tiles[i].x + size > x && tiles[i].y < y && tiles[i].y + size > y){
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        function setTimeAndLoad() {
            timeOnLoad.current = Date.now();
            setLoaded(true);
            scrollable.current = document.getElementById('scrollable');
            tiles.current = drawTiles(climb_start,climb_width);
        }
        window.addEventListener('load', setTimeAndLoad);
        return () => {
            document.removeEventListener('load', setTimeAndLoad);
        }
    }, []);

    //TODO: la pagina cade

    useEffect(() => {
        if(!loaded) return;
        const interval = setInterval(() => {
            if(grubbing.current) return;
            if(scrollable.current.scrollTop < center.y) {
                let t = getTime();
                scrollable.current.scrollTop += 1/2 * t*t*t / 1000000;
            }
          }, 1);
          return () => clearInterval(interval);
    }, [loaded]);

    useEffect(() => {
        if(!loaded) return;
        const ele = document.getElementById('scrollable');
        const childs = document.getElementById('childs');
        scrollable.current.scrollTop = pos.current.top;
        scrollable.current.scrollLeft = pos.current.left;
        function handleDown(e) {
            if(!checkIfGrabbable(tiles.current,e.clientX + scrollable.current.scrollLeft,e.clientY + scrollable.current.scrollTop,TILE_SIZE)) return;
            grubbing.current = true;
            pos.current = { ...pos.current, x: e.clientX, y: e.clientY, left: scrollable.current.scrollLeft, top: scrollable.current.scrollTop }
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';
            childs.style.cursor = 'grabbing';
            childs.style.userSelect = 'none';
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleUp)
        }
        function handleMove(e) {
            const dx = e.clientX - pos.current.x;
            const dy = e.clientY - pos.current.y;
            // Scroll the element
            scrollable.current.scrollTop = pos.current.top - dy;
            scrollable.current.scrollLeft = pos.current.left - dx;
        }
        function handleUp() {
            grubbing.current = false;
            timeOnLoad.current = Date.now();
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
            ele.style.cursor = 'grab';
            childs.style.cursor = 'grab';
            ele.style.removeProperty('user-select');
        }
        window.addEventListener('mousedown', handleDown);
        return () => {
            window.removeEventListener('mousedown', handleDown);
        }
    }, [loaded]);

    useEffect(() => {
        if(!loaded) return;
        const ele = document.getElementById('scrollable');
        const childs = document.getElementById('childs');
        scrollable.current.scrollTop = pos.current.top;
        scrollable.current.scrollLeft = pos.current.left;

        function preventMotion(event) {
            window.scrollTo(0, 0);
            event.preventDefault();
            event.stopPropagation();
        }
        function handleDown(e) {
            if(!checkIfGrabbable(tiles.current,e.touch.clientX + scrollable.current.scrollLeft,e.touch.clientY + scrollable.current.scrollTop,TILE_SIZE)) return;
            grubbing.current = true;
            pos.current = { ...pos.current, x: e.touches[0].clientX, y: e.touches[0].clientY, left: scrollable.current.scrollLeft, top: scrollable.current.scrollTop }
            ele.style.userSelect = 'none';
            childs.style.userSelect = 'none';
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleUp)
        }
        function handleMove(e) {
            preventMotion(e);
            const dx = e.touches[0].clientX - pos.current.x;
            const dy = e.touches[0].clientY - pos.current.y;
            // Scroll the element
            scrollable.current.scrollTop = pos.current.top - dy;
            scrollable.current.scrollLeft = pos.current.left - dx;
        }
        function handleUp(e) {
            grubbing.current = false;
            timeOnLoad.current = Date.now();
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleUp);
            ele.style.cursor = 'grab';
            childs.style.cursor = 'grab';
            ele.style.removeProperty('user-select');
        }
        window.addEventListener('touchstart', handleDown);
        window.addEventListener('scroll', preventMotion, false)
        return () => {
            window.removeEventListener('touchstart', handleDown);
            window.removeEventListener('scroll', preventMotion, false)
        }
    }, [loaded]);

    function goClimb() {
        scrollable.current.scrollLeft = climb_start - climb_width;
    }

    return (
        <div id="scrollable" className="h-screen w-screen overflow-hidden">
            <div id="childs" style={{ height: X + "px", width: Y + "px" }} className={"cursor-grab relative border-solid border-blue-900 border-8"}>
                <canvas id="tileCanvas" height={Y} width={X} className="absolute top-0 left-0 h-[100%] w-[100%]" />
                <Bg />
                <div className="centered_almost">
                    <Home />
                    <button className="absolute top-[50%] left-0 m-4 p-2 bg-blue-900 text-white rounded-lg" onClick={goClimb}>Go climb!</button>
                </div>
            </div>
        </div>
    );
}