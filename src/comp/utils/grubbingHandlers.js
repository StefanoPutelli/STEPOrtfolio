import { useEffect } from "react";

export default function useEventListener(eventName, handler, element = window) {
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

    
    useEffect(() => {
        if (!loaded) return;
        const interval = setInterval(() => {
            if (scrollable.current.scrollTop < falling_bottom && !grubbing.current && climb_started.current) {
                let t = getTime();
                scrollable.current.scrollTop += 1 / 2 * t * t * 9.81 * 0.00001 + 1;
            }
        }, 1000/FPS);
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
            if(climb_started.current){
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
            if(climb_started.current){
                if (!checkIfGrabbable(tiles.current, e.touches[0].clientX + scrollable.current.scrollLeft, e.touches[0].clientY + scrollable.current.scrollTop, TILE_SIZE)) return;
            }
            grubbing.current = true;grubbing.current = true;
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
}