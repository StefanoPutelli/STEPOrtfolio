import { useState, useEffect } from 'react';
import '../index.css';

export default function useTypewriter(props) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex1, setCurrentIndex1] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(-1);

    useEffect(() => {

        function getRandomDelay() {
            return Math.pow(Math.random() * (props.maxDelay - props.minDelay) + props.minDelay, 1.6);
        }
        if (currentIndex1 < props.text1.length) {
            const timer = setTimeout(() => {
                setDisplayText((prevDisplayText) => prevDisplayText + props.text1[currentIndex1]);
                setCurrentIndex1((prevIndex) => prevIndex + 1);
            }, getRandomDelay());

            return () => clearTimeout(timer);
        } else if (currentIndex1 === props.text1.length) {
            setDisplayText((prevDisplayText) => prevDisplayText + '<br>');
            setTimeout(() => {
                setCurrentIndex2(0);
            }, 1500);
            setCurrentIndex1((prevIndex) => prevIndex + 1);
        } else {
            if (currentIndex2 < props.text2.length && currentIndex2 !== -1) {
                const timer = setTimeout(() => {
                    setDisplayText((prevDisplayText) => prevDisplayText + props.text2[currentIndex2]);
                    setCurrentIndex2((prevIndex) => prevIndex + 1);
                }, getRandomDelay());

                return () => clearTimeout(timer);
            }
        }
    }, [currentIndex1, currentIndex2, props.text1, props.text2, props.minDelay, props.maxDelay]);

    return (
        <div id="typewrite" style={{ display: 'inline-block' }}>
            <div style={{ display: 'inline-block', color: "white", fontFamily: "Source code pro", fontSize: "5vh", textAlign: "center" }} dangerouslySetInnerHTML={{ __html: displayText }} />
            {/* {showCursor && <span style={{ display: 'flex', width: '2px', height: '24px', backgroundColor: 'white' }}>&nbsp;</span>} */}
        </div>
    );
}