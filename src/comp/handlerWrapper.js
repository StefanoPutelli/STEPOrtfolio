import { useEffect, useRef, useState } from "react";
import drawTiles from "./utils/drawTiles";
import World from "./World";
import Overlay from "./LoadingOverlay";

const TILE_SIZE = 50;

const climb_start = 200;

const N_TILES = 30;

const FPS = 60;

export default function HandlerWrapper(props) {

    const X = props.X;
    const Y = props.Y;

    const falling_bottom = Y;

    const [loaded, setLoaded] = useState(false);

    const [windowSize, setWindowSize] = useState({ width: window.innerWidth * window.devicePixelRatio, height: window.innerHeight * window.devicePixelRatio })

    const timeOnLoad = useRef(0);
    const grubbing = useRef(false);

    const scrollable = useRef(null);

    const climb_started = useRef(false);

    const gravity = useRef(false);

    const tiles = useRef(null);

    const center = getScrollCenter()
    const pos = useRef({ x: 0, y: 0, left: center.x, top: center.y });

    function getScrollCenter() {
        let x = X / 2 - window.innerWidth / 2;
        let y = Y / 2 - window.innerHeight / 2;
        return { x, y }
    }

    function getTime() {
        return Date.now() - timeOnLoad.current;
    }

    function checkIfGrabbable(tiles, x, y, size) {
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x < x && tiles[i].x + size > x && tiles[i].y < y && tiles[i].y + size > y) {
                return true;
            }
        }
        return false;
    }

    function setSize() {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        // Gestione della barra degli strumenti del browser
        if (window.screen.availHeight > window.innerHeight) {
            screenHeight += (window.screen.availHeight - window.innerHeight);
        }

        // Gestione della densità di pixel
        // const pixelRatio = window.devicePixelRatio;
        // screenWidth *= pixelRatio;
        // screenHeight *= pixelRatio;
        setWindowSize({ width: window.innerWidth > window.innerHeight ? screenHeight : screenWidth, height: screenHeight })
    }

    useEffect(() => {
        window.addEventListener('resize', setSize);
        return () => {
            window.removeEventListener('resize', setSize);
        }
    }, [])

    useEffect(() => {
        function setTimeAndLoad() {
            timeOnLoad.current = Date.now();
            setLoaded(true);
            setSize();
            //activate gravity
            //################
            scrollable.current = document.getElementById('scrollable');
            tiles.current = drawTiles(climb_start, center.y, window.innerWidth > 800 ? 800 : window.innerWidth, TILE_SIZE, N_TILES);
            setTimeout(() => {
                gravity.current = true;
                timeOnLoad.current = Date.now();
            }, 1000);
        }
        if (document.readyState === "complete") {
            setTimeAndLoad();
        } else {
            window.addEventListener('load', setTimeAndLoad);
        }
        return () => {
            window.removeEventListener("load", setTimeAndLoad);
        }
    }, []);

    //TODO: la pagina cade

    useEffect(() => {
        if (!loaded) return;
        const interval = setInterval(() => {
            if (scrollable.current.scrollTop < falling_bottom && !grubbing.current && gravity.current) {
                let t = getTime();
                scrollable.current.scrollTop += 1 / 2 * t * t * 9.81 * 0.00001 + 1;
            }
        }, 1000 / FPS);
        return () => clearInterval(interval);
    }, [loaded]);

    useEffect(() => {
        if (!loaded) return;
        const ele = document.getElementById('scrollable');
        const childs = document.getElementById('childs');
        scrollable.current.scrollTop = pos.current.top;
        scrollable.current.scrollLeft = pos.current.left;
        // function preventMotion(event) {
        //     window.scrollTo(0, 0);
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        function handleDown(e) {
            if (climb_started.current) {
                if (!checkIfGrabbable(tiles.current, e.clientX + scrollable.current.scrollLeft, e.clientY + scrollable.current.scrollTop, TILE_SIZE)) return;
            }
            grubbing.current = true;
            pos.current = { ...pos.current, x: e.clientX, y: e.clientY, left: scrollable.current.scrollLeft, top: scrollable.current.scrollTop }
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';
            childs.style.cursor = 'grabbing';
            childs.style.userSelect = 'none';
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleUp)
        }
        function handleDown_touch(e) {
            if (climb_started.current) {
                if (!checkIfGrabbable(tiles.current, e.touches[0].clientX + scrollable.current.scrollLeft, e.touches[0].clientY + scrollable.current.scrollTop, TILE_SIZE)) return;
            }
            grubbing.current = true; grubbing.current = true;
            pos.current = { ...pos.current, x: e.touches[0].clientX, y: e.touches[0].clientY, left: scrollable.current.scrollLeft, top: scrollable.current.scrollTop }
            ele.style.userSelect = 'none';
            childs.style.userSelect = 'none';
            window.addEventListener('touchmove', handleMove_touch);
            window.addEventListener('touchend', handleUp_touch)
        }
        function handleMove(e) {
            const dx = e.clientX - pos.current.x;
            const dy = e.clientY - pos.current.y;
            // Scroll the element
            scrollable.current.scrollTop = pos.current.top - dy;
            scrollable.current.scrollLeft = pos.current.left - dx;
        }
        function handleMove_touch(e) {
            const dx = e.touches[0].clientX - pos.current.x;
            const dy = e.touches[0].clientY - pos.current.y;
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
        function handleUp_touch(e) {
            grubbing.current = false;
            timeOnLoad.current = Date.now();
            window.removeEventListener('touchmove', handleMove_touch);
            window.removeEventListener('touchend', handleUp_touch);
            ele.style.cursor = 'grab';
            childs.style.cursor = 'grab';
            ele.style.removeProperty('user-select');
        }
        window.addEventListener('touchstart', handleDown_touch);
        window.addEventListener('mousedown', handleDown);
        return () => {
            window.removeEventListener('mousedown', handleDown);
            window.removeEventListener('touchstart', handleDown_touch);
        }
    }, [loaded]);

    function goClimb() {
        scrollable.current.scrollLeft = climb_start;
    }

    return (
        <>
            <Overlay show={loaded} />
            <div id="scrollable" className="h-screen w-screen overflow-hidden">
                <World size={{
                    width: windowSize.width,
                    height: windowSize.height
                }}
                    goClimb={goClimb} X={props.X} Y={props.Y}
                />
            </div>
        </>
    );
}