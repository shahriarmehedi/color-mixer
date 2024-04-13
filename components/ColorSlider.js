'use client'

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const ColorSlider = ({ svg, color, value, onChange }) => {
    const [dragging, setDragging] = useState(false);
    const sliderRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (dragging) {
                const rect = sliderRef.current.getBoundingClientRect();
                let newValue = Math.round(((rect.bottom - e.clientY) / rect.height) * 255);
                newValue = Math.min(Math.max(newValue, 0), 255); // Ensure value is within bounds
                onChange(newValue);
            }
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, onChange]);

    const handleMouseDown = (e) => {
        setDragging(true);
        e.preventDefault(); // Prevent default behavior to avoid selection of the icon text
    };

    const sliderPosition = ((255 - value) / 255) * 100;

    return (
        <div className="flex flex-col items-center space-y-2">
            {/* <p className="text-lg font-bold">{color}</p> */}
            <div
                ref={sliderRef}
                className="h-64 w-12 relative cursor-pointer flex flex-col items-center "
                onMouseDown={handleMouseDown}
            >
                <div
                    style={{ background: `linear-gradient(to top, black, ${color})` }}
                    className=' h-full w-[3px]'>

                </div>
                <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 "
                    style={{ top: `${sliderPosition}%`, pointerEvents: dragging ? 'none' : 'auto' }}
                >
                    <Image
                        src={svg}
                        alt="Slider Icon"
                        onMouseDown={handleMouseDown} // This is to start dragging when clicking the icon
                        className="w-8 h-8"
                        style={{ marginTop: '-1rem' }}
                        width={32}
                        height={32}
                    />
                </div>
            </div>
            {/* <p>{value}</p> */}
        </div>
    );
};

export default ColorSlider;