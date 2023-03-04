import { useEffect, useRef } from "react";
import Home from "./Home";
import Bg from "./subComp/animBg";

const X = "3000";
const Y = "3000";

export default function World() {

    function getScrollCenter() {
        let x = X / 2 - window.innerWidth / 2;
        let y = Y / 2 - window.innerHeight / 3;
        return { x, y }
    }

    const center = getScrollCenter()
    const pos = useRef({ x: 0, y: 0, left: center.x, top: center.y });

    useEffect(() => {
        const ele = document.getElementById('scrollable');
        const childs = document.getElementById('childs');
        ele.scrollTop = pos.current.top;
        ele.scrollLeft = pos.current.left;
        function handleDown(e) {
            pos.current = { ...pos.current, x: e.clientX, y: e.clientY, left: ele.scrollLeft, top: ele.scrollTop }
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
            ele.scrollTop = pos.current.top - dy;
            ele.scrollLeft = pos.current.left - dx;
        }
        function handleUp() {
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
    }, []);

    useEffect(() => {
        const ele = document.getElementById('scrollable');
        const childs = document.getElementById('childs');
        ele.scrollTop = pos.current.top;
        ele.scrollLeft = pos.current.left;

        function preventMotion(event) {
            window.scrollTo(0, 0);
            event.preventDefault();
            event.stopPropagation();
        }
        function handleDown(e) {
            pos.current = { ...pos.current, x: e.touches[0].clientX, y: e.touches[0].clientY, left: ele.scrollLeft, top: ele.scrollTop }
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
            ele.scrollTop = pos.current.top - dy;
            ele.scrollLeft = pos.current.left - dx;
        }
        function handleUp(e) {
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
    }, []);

    return (
        <div id="scrollable" className="h-screen w-screen overflow-hidden">
            <Bg />
            <div id="childs" style={{ height: X + "px", width: Y + "px" }} className={"cursor-grab relative border-solid border-white border-8"}>
                <div className="centered">
                    <Home />
                </div>
            </div>
        </div>
    );
}