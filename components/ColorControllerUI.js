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


        // Update Yellow slider position when Red slider or Green slider position is changed and also update Yellow SLider when Magenta slider is changed
        if (color === 'Red' || color === 'Green' || color === 'Magenta' || color === 'Cyan') {
            setYellow(Math.round((newRed + newGreen) / 2));
        }


        // Update Cyan slider position when Green slider or Blue slider position is changed and also update Cyan SLider when Yellow slider is changed
        if (color === 'Green' || color === 'Blue' || color === 'Yellow' || color === 'Magenta') {
            setCyan(Math.round((newGreen + newBlue) / 2));
        }


        // Update Magenta slider position when Red slider or Blue slider position is changed and also update Magenta SLider when Yellow slider is changed
        if (color === 'Red' || color === 'Blue' || color === 'Yellow' || color === 'Cyan') {
            setMagenta(Math.round((newRed + newBlue) / 2));
        }


    };


    const outputColor = `rgb(${red},${green},${blue})`;
    // const hexColor = `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;




    // Custom Grid creation

    // selecting a grid div will console log the grid div id
    const selectGrid = (e) => {
        console.log(e.target.id);
    }


    const gridDiv =
        <div
            id={1}
            onClick={selectGrid}
            className="w-36 h-36 border border-zinc-300 dark:border-zinc-700 cursor-pointer"
            style={{
                backgroundColor: outputColor,
            }}
        ></div>




    // Create a function that will take input of grid number and return the grid div


    const [gridNumber, setGridNumber] = useState(3);



    const createGrid = (gridNumber) => {
        let grid = [];
        for (let i = 0; i < gridNumber; i++) {
            grid.push(gridDiv);
        }
        return grid;
    }


    // appropriate grid classNames based on grid number

    const gridClass = gridNumber === 1 ? "" : gridNumber === 2 ? "grid-cols-2" : gridNumber > 2 && gridNumber <= 4 ? "grid-cols-3" : gridNumber >= 5 && gridNumber <= 9 ? "grid-cols-3" : gridNumber >= 10 && gridNumber <= 16 ? "grid-cols-4" : "grid-cols-5";







    return (
        <div className="h-screen">

            <div className="flex items-center gap-5 justify-center pt-10 lg:pt-36 scale-90 lg:scale-100">
                <div
                    className={`grid grid-cols-1 gap-5 ${gridClass}`}
                >
                    {createGrid(gridNumber)}
                </div>


            </div>
            <div className="flex flex-col justify-between bg-[#C4C4C4] dark:bg-zinc-700 pt-10 rounded-2xl scale-90 lg:scale-100 lg:absolute lg:bottom-20 lg:right-20 w-[340px]">
                <div className="flex items-center  flex-wrap ">
                    <ColorSlider svg="/GS_handle.svg" color="white" value={black} onChange={(value) => handleSliderChange('Black', value)} />
                    <ColorSlider svg="/R handle.svg" color="Red" value={red} onChange={(value) => handleSliderChange('Red', value)} />
                    <ColorSlider svg="/Y_handle.svg" color="Yellow" value={yellow} onChange={(value) => handleSliderChange('Yellow', value)} />
                    <ColorSlider svg="/G_handle.svg" color="Green" value={green} onChange={(value) => handleSliderChange('Green', value)} />
                    <ColorSlider svg="/C_handle.svg" color="Cyan" value={cyan} onChange={(value) => handleSliderChange('Cyan', value)} />
                    <ColorSlider svg="/B_handle.svg" color="Blue" value={blue} onChange={(value) => handleSliderChange('Blue', value)} />
                    <ColorSlider svg="/M_handle.svg" color="Magenta" value={magenta} onChange={(value) => handleSliderChange('Magenta', value)} />
                </div>
                <div className="flex justify-center items-center gap-1 pt-7">
                    <div className='bg-[#A9A9A9] dark:bg-zinc-600 text-white text-center w-1/2 p-3 rounded-bl-2xl'>
                        <h2>
                            {
                                `${red},${green},${blue}`
                            }
                        </h2>
                    </div>
                    <div className='bg-[#A9A9A9] dark:bg-zinc-600 text-white text-center w-1/2 p-3 rounded-br-2xl'>
                        <h2>
                            {
                                //hexadecimal value in 0x000000 format 
                                `0x${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1).toUpperCase()}`
                            }
                        </h2>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ColorControllerUI;






