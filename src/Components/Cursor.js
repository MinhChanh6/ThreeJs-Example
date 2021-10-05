import React from 'react'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TweenMax } from 'gsap/gsap-core';

const Cursor = () => {
    const cursorRef = React.useRef(null);

    React.useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;

            TweenMax.to(cursorRef.current, 0.3, {
                x: clientX,
                y: clientY
            });
        })

    }, [])


    return (
        <>
            <div className="cursor" ref={cursorRef}>
            </div>
        </>
    )
}

export default Cursor
