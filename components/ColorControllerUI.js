'use client'

import { useEffect, useState } from 'react';
import ColorSlider from './ColorSlider';
import Swal from 'sweetalert2';

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




    useEffect(() => {

        // Update Black slider position
        const newBlack = Math.round((red + green + blue) / 3);
        setBlack(newBlack);

        // Update Yellow slider position when Red slider or Green slider position is changed and also update Yellow SLider when Magenta slider is changed
        setYellow(Math.round((red + green) / 2));

        // Update Cyan slider position when Green slider or Blue slider position is changed and also update Cyan SLider when Yellow slider is changed
        setCyan(Math.round((green + blue) / 2));

        // Update Magenta slider position when Red slider or Blue slider position is changed and also update Magenta SLider when Yellow slider is changed
        setMagenta(Math.round((red + blue) / 2));

    }, [red, green, blue]);


    const outputColorCode = `rgb(${red},${green},${blue})`;
    // const hexColor = `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;




    // ------------------- GRID Color Controller UI ------------------- //


    const [gridNumber, setGridNumber] = useState(9);


    const [outputColor, setOutputColor] = useState(outputColorCode); // Initial output color
    const [boxColors, setBoxColors] = useState(Array(16).fill(outputColorCode)); // Array to store colors of each box
    const [selectedBox, setSelectedBox] = useState(null); // State to keep track of the selected box

    // Function to handle changing the output color for a specific box
    const handleColorChange = (newColor) => {
        setOutputColor(
            newColor
        );
        // If a box is selected, update its color
        if (selectedBox !== null) {
            const newBoxColors = [...boxColors]; // Create a copy of boxColors
            newBoxColors[selectedBox] = newColor; // Update the color of the selected box
            setBoxColors(newBoxColors); // Update boxColors state
        }
    };



    // call handleColorChange when any of the color sliders are changed
    useEffect(() => {
        handleColorChange(outputColorCode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [outputColorCode]);

    // Function to handle selecting a box
    const handleBoxClick = (index) => {
        setSelectedBox(index);
        // set the slider values to the selected box color values

        if (boxColors[index] === 'rgb(0,0,0)') {
            setRed(0);
            setGreen(0);
            setBlue(0);
            setCyan(0);
            setMagenta(0);
            setYellow(0);
            setBlack(0);
        } else if (boxColors[index] === 'rgb(255,255,255)') {
            setRed(255);
            setGreen(255);
            setBlue(255);
            setCyan(255);
            setMagenta(255);
            setYellow(255);
            setBlack(255);
        } else {
            // Extract the RGB values from the color string and update the sliders
            const [r, g, b] = boxColors[index].match(/\d+/g);
            setRed(parseInt(r));
            setGreen(parseInt(g));
            setBlue(parseInt(b));
        }



    };

    // Function to create individual grid box elements
    const createGrid = (gridNumber) => {
        let grid = [];
        for (let i = 0; i < gridNumber; i++) {
            grid.push(
                <div
                    key={i}
                    className={`w-[120px] h-[120px] lg:w-[200px] lg:h-[200px] border cursor-pointer ${selectedBox === i ? " border-sky-500 dark:border-sky-500  " : "border-zinc-300 dark:border-zinc-700"
                        }`}
                    style={{
                        backgroundColor:  // Use boxColors array to set background color
                            boxColors[i],
                    }}
                    onClick={() => handleBoxClick(i)} // Call handleBoxClick when a box is clicked
                ></div>
            );
        }
        return grid;
    };

    // Determine appropriate grid structure based on grid number
    const gridClass =
        gridNumber === 1
            ? ""
            : gridNumber === 2
                ? "grid-cols-2"
                : gridNumber > 2 && gridNumber <= 3
                    ? "grid-cols-3"
                    : gridNumber === 4
                        ? "grid-cols-2"
                        : gridNumber >= 5 && gridNumber <= 9
                            ? "grid-cols-3"
                            : gridNumber >= 10 && gridNumber <= 12
                                ? "grid-cols-4"
                                : "grid-cols-5";



    // state

    const [isGridCreated, setIsGridCreated] = useState(false);

    const createAGrid = () => {
        Swal.fire({
            // max grid number is 16
            title: 'Enter box number (1-12):',
            input: 'number',
            inputAttributes: {
                min: 1,
                max: 12,
                step: 1,
            },
            showCancelButton: true,
            confirmButtonText: 'Create Grid',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
            preConfirm: (gridNumber) => {
                return new Promise((resolve) => {
                    if (gridNumber > 0 && gridNumber <= 16) {
                        resolve();
                    } else {
                        resolve(Swal.showValidationMessage('Please enter a number between 1 and 16'));
                    }
                });
            }
        })
            .then((result) => {
                if (result.isConfirmed) {
                    setGridNumber(parseInt(result.value));
                    setIsGridCreated(true);
                }
            });
    }


    const resetLayout = () => {
        setRed(0);
        setGreen(0);
        setBlue(0);
        setBlack(0);
        setYellow(0);
        setCyan(0);
        setMagenta(0);
        setGridNumber(0);
        setIsGridCreated(false);
        // clear the box colors and set 0,0,0 color to all boxes
        setBoxColors(Array(16).fill('rgb(0,0,0)'));
        setSelectedBox(null);

    }




    return (
        <div className="min-h-screen pb-10">

            <div className="flex items-center gap-10 justify-center pt-10 lg:pt-40 scale-90 lg:scale-100">
                {
                    !isGridCreated ? (
                        <button onClick={createAGrid} className="bg-[#A9A9A9] dark:bg-zinc-600 text-white text-center  px-7 py-5 rounded-lg">
                            Create a Grid Layout
                        </button>
                    ) : (
                        <div
                            className={`grid grid-cols-1 gap-5 ${gridClass}`}
                        >
                            {createGrid(gridNumber)}
                        </div>
                    )
                }
            </div>


            <div className="flex flex-col justify-center lg:justify-between bg-[#C4C4C4] dark:bg-zinc-700 pt-10 rounded-2xl lg:scale-100 lg:absolute lg:bottom-20 lg:right-20 mt-10 lg:mt-0 w-[340px]">
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

            {
                isGridCreated && (
                    <div
                        onClick={resetLayout}
                        className=" lg:absolute lg:bottom-20 lg:left-20 w-[300px] cursor-pointer">
                        {/* reset layout button */}
                        <div className="flex justify-center items-center gap-1 pt-7">
                            <div className='bg-[#A9A9A9] dark:bg-zinc-600 text-white text-center w-1/2 p-3 rounded-lg'>
                                <h2>
                                    {
                                        `Reset Layout`
                                    }
                                </h2>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default ColorControllerUI;






