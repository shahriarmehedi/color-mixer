'use client'

import { useState } from 'react';
import ColorSlider from './ColorSlider';

const ColorControllerUI = () => {
    const [red, setRed] = useState(0);
    const [green, setGreen] = useState(0);
    const [blue, setBlue] = useState(0);
    const [black, setBlack] = useState(0);
    const [yellow, setYellow] = useState(0); // Corrected state variable
    const [cyan, setCyan] = useState(0); // Corrected state variable
    const [magenta, setMagenta] = useState(0); // Corrected state variable

    const handleSliderChange = (color, value) => {
        let newRed = red;
        let newGreen = green;
        let newBlue = blue;

        switch (color) {
            case 'Red':
                newRed = value;
                break;
            case 'Green':
                newGreen = value;
                break;
            case 'Blue':
                newBlue = value;
                break;
            case 'Black':
                const avg = Math.round((red + green + blue) / 3);
                newRed = avg;
                newGreen = avg;
                newBlue = avg;
                break;
            case 'Yellow':
                newRed = value;
                newGreen = value;
                setYellow(value); // Update the state variable for Yellow
                break;
            case 'Cyan':
                newGreen = value;
                newBlue = value;
                setCyan(value); // Update the state variable for Cyan
                break;
            case 'Magenta':
                newRed = value;
                newBlue = value;
                setMagenta(value); // Update the state variable for Magenta
                break;
            default:
                break;
        }

        // Update Black slider position
        const newBlack = Math.round((newRed + newGreen + newBlue) / 3);
        setBlack(newBlack);

        setRed(newRed);
        setGreen(newGreen);
        setBlue(newBlue);
    };

    const outputColor = `rgb(${red},${green},${blue})`;
    const hexColor = `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex items-center space-y-8 flex-wrap">
                <ColorSlider color="Red" value={red} onChange={(value) => handleSliderChange('Red', value)} />
                <ColorSlider color="Green" value={green} onChange={(value) => handleSliderChange('Green', value)} />
                <ColorSlider color="Blue" value={blue} onChange={(value) => handleSliderChange('Blue', value)} />
                <ColorSlider color="Black" value={black} onChange={(value) => handleSliderChange('Black', value)} />
                <ColorSlider color="Yellow" value={yellow} onChange={(value) => handleSliderChange('Yellow', value)} />
                <ColorSlider color="Cyan" value={cyan} onChange={(value) => handleSliderChange('Cyan', value)} />
                <ColorSlider color="Magenta" value={magenta} onChange={(value) => handleSliderChange('Magenta', value)} />
            </div>
            <div
                className="w-32 h-32 mt-8"
                style={{
                    backgroundColor: outputColor,
                    border: '1px solid black',
                }}
            ></div>
            <p className="mt-4">RGB: {outputColor}</p>
            <p>Hex: {hexColor}</p>
        </div>
    );
};

export default ColorControllerUI;






