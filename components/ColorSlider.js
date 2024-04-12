'use client'

import { useState } from 'react';

const ColorSlider = ({ color, value, onChange }) => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <p className="text-lg font-bold">{color}</p>
            <input
                type="range"
                min="0"
                max="255"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="slider-vertical"
                style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical', height: '10rem' }}
            />
            <p>{value}</p>
        </div>
    );
};

export default ColorSlider;

