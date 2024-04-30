/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useRef, useState } from 'react';
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
                // Moving black slider should update all other sliders to same value as black slider
                newRed = value;
                newGreen = value;
                newBlue = value;
                setRed(value); // Update the state variable for Red
                setGreen(value); // Update the state variable for Green
                setBlue(value); // Update the state variable for Blue

                break;
            case 'Yellow':

                // newRed = value;
                // newGreen = value;

                // Corrected formula
                // newRed = value;
                // newGreen = Math.round(2 * value - newRed);

                //when pressing/dragging yellow slider, the newRed and newGreen sliders maintain their Relative position to the Secondary slider when moving up and down instead of equalizing both Primary sliders' positions to the yellow slider position. 

                // when yellow slider is moving down, the green and red slider smoothly come closer to the yellow slider position and when all three sliders are at the same position, the yellow slider moves down and the green and red slider moves along with it.

                if (value > yellow) {
                    // when yellow slider is moving up
                    // greater from green or red is constant until yellow slider reaches to the same position, then all three sliders move up together till 255
                    if (green > red) {
                        newGreen = green > 255 ? 255 : green;
                        newRed = Math.round(2 * value - green);
                    } else {
                        newRed = red > 255 ? 255 : red;
                        newGreen = Math.round(2 * value - red);
                    }


                } else {
                    // when yellow slider is moving down
                    // lower from green or red is constant until yellow slider reaches to the same position, then all three sliders move down together till 0
                    if (green < red) {
                        newGreen = green < 0 ? 0 : green;
                        newRed = Math.round(2 * value - green);
                    } else {
                        newRed = red < 0 ? 0 : red;
                        newGreen = Math.round(2 * value - red);
                    }

                }

                setYellow(value); // Update the state variable for Yellow
                break;
            case 'Cyan':
                // newGreen = value;
                // newBlue = value;

                // Corrected formula
                // newGreen = value;
                // newBlue = Math.round(2 * value - newGreen);


                //when pressing/dragging cyan slider, the newGreen and newBlue sliders maintain their Relative position to the Secondary slider when moving up and down instead of equalizing both Primary sliders' positions to the cyan slider position.

                // when cyan slider is moving down, the green and blue slider smoothly come closer to the cyan slider position and when all three sliders are at the same position, the cyan slider moves down and the green and blue slider moves along with it.

                if (value > cyan) {
                    // when cyan slider is moving up
                    // greater from green or blue is constant until cyan slider reaches to the same position, then all three sliders move up together till 255
                    if (green > blue) {
                        newGreen = green;
                        newBlue = Math.round(2 * value - green);
                    } else {
                        newBlue = blue;
                        newGreen = Math.round(2 * value - blue);
                    }

                } else {
                    // when cyan slider is moving down
                    // lower from green or blue is constant until cyan slider reaches to the same position, then all three sliders move down together till 0
                    if (green < blue) {
                        newGreen = green;
                        newBlue = Math.round(2 * value - green);
                    } else {
                        newBlue = blue;
                        newGreen = Math.round(2 * value - blue);
                    }
                }

                setCyan(value); // Update the state variable for Cyan
                break;
            case 'Magenta':
                // newRed = value;
                // newBlue = value;

                // Corrected formula
                // newRed = value;
                // newBlue = Math.round(2 * value - newRed);


                //when pressing/dragging magenta slider, the newRed and newBlue sliders maintain their Relative position to the Secondary slider when moving up and down instead of equalizing both Primary sliders' positions to the magenta slider position.

                // when magenta slider is moving down, the red and blue slider smoothly come closer to the magenta slider position and when all three sliders are at the same position, the magenta slider moves down and the red and blue slider moves along with it.

                if (value > magenta) {
                    // when magenta slider is moving up
                    // greater from red or blue is constant until magenta slider reaches to the same position, then all three sliders move up together till 255

                    if (red > blue) {
                        newRed = red;
                        newBlue = Math.round(2 * value - red);
                    } else {
                        newBlue = blue;
                        newRed = Math.round(2 * value - blue);
                    }
                } else {
                    // when magenta slider is moving down
                    // lower from red or blue is constant until magenta slider reaches to the same position, then all three sliders move down together till 0
                    if (red < blue) {
                        newRed = red;
                        newBlue = Math.round(2 * value - red);
                    } else {
                        newBlue = blue;
                        newRed = Math.round(2 * value - blue);
                    }
                }

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
            // setYellow(Math.round((newRed + newGreen) / 2)); 
            setYellow(Math.round(newRed + (newGreen - newRed) / 2)); // Corrected formula
        }


        // Update Cyan slider position when Green slider or Blue slider position is changed and also update Cyan SLider when Yellow slider is changed
        if (color === 'Green' || color === 'Blue' || color === 'Yellow' || color === 'Magenta') {
            // setCyan(Math.round((newGreen + newBlue) / 2));
            setCyan(Math.round(newGreen + (newBlue - newGreen) / 2)); // Corrected formula
        }


        // Update Magenta slider position when Red slider or Blue slider position is changed and also update Magenta SLider when Yellow slider is changed
        if (color === 'Red' || color === 'Blue' || color === 'Yellow' || color === 'Cyan') {
            // setMagenta(Math.round((newRed + newBlue) / 2));
            setMagenta(Math.round(newRed + (newBlue - newRed) / 2)); // Corrected formula
        }
    };

    useEffect(() => {

        // Update Black slider position
        const newBlack = Math.round((red + green + blue) / 3);
        setBlack(newBlack);

        // Update Yellow slider position when Red slider or Green slider position is changed and also update Yellow SLider when Magenta slider is changed
        // setYellow(Math.round((red + green) / 2));
        setYellow(Math.round(red + (green - red) / 2)); // Corrected formula

        // Update Cyan slider position when Green slider or Blue slider position is changed and also update Cyan SLider when Yellow slider is changed
        // setCyan(Math.round((green + blue) / 2)); 
        setCyan(Math.round(green + (blue - green) / 2)); // Corrected formula

        // Update Magenta slider position when Red slider or Blue slider position is changed and also update Magenta SLider when Yellow slider is changed
        // setMagenta(Math.round((red + blue) / 2));
        setMagenta(Math.round(red + (blue - red) / 2)); // Corrected formula

    }, [red, green, blue]);


    const outputColorCode = `rgb(${red},${green},${blue})`;
    // const hexColor = `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;




    // ------------------- GRID Color Controller UI ------------------- //


    const [outputColor, setOutputColor] = useState(outputColorCode); // Initial output color
    const [boxColors, setBoxColors] = useState(Array(16).fill(outputColorCode)); // Array to store colors of each box
    let [selectedBox, setSelectedBox] = useState(null); // State to keep track of the selected box

    console.log('Selected Box:', selectedBox)


    // Function to handle changing the output color for a specific box

    const handleColorChange = (newColor) => {
        setOutputColor(
            newColor
        );
        // If a box is selected update its color, if multiple box selected updated multiple box color (selextedBox is an array)
        if (selectedBox !== null && selectedBox !== 'background') {
            const newBoxColors = [...boxColors]; // Create a copy of boxColors
            if (Array.isArray(selectedBox)) {
                selectedBox.forEach((index) => {
                    newBoxColors[index] = newColor; // Update the color of the selected box
                });
            } else {
                newBoxColors[selectedBox] = newColor; // Update the color of the selected box
            }
            setBoxColors(newBoxColors); // Update boxColors state
        }
    };


    // call handleColorChange when any of the color sliders are changed
    useEffect(() => {
        handleColorChange(outputColorCode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [outputColorCode]);







    // ------------------------------------ CLONE COLOR ------------------------------------ //


    const [clonedOutputColor, setClonedOutputColor] = useState(null);


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.shiftKey && selectedBox !== null && selectedBox !== 'background') {

                // setClonedOutputColor(boxColors[selectedBox]);
                //    selected box either can be a single value or can be an array of values


                if (Array.isArray(selectedBox)) {
                    setClonedOutputColor(boxColors[selectedBox[0]]);
                } else {
                    setClonedOutputColor(boxColors[selectedBox]);
                }

            }
        };

        const handleKeyUp = (event) => {
            if (event.key === 'Shift' && selectedBox !== null) {
                setClonedOutputColor(null);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [selectedBox, boxColors]);


    console.log('clonedOutputColor', clonedOutputColor);



    // Function to handle selecting a box

    const handleBoxClick = (index) => {
        // if any cloned color is present, set the cloned color to the selected box

        if (clonedOutputColor !== null && selectedBox !== 'background') {

            const newBoxColors = [...boxColors]; // Create a copy of boxColors
            newBoxColors[index] = clonedOutputColor; // Update the color of the selected box
            setBoxColors(newBoxColors); // Update boxColors state

            // COMBINED LOGIC FOR SELECTING MULTIPLE BOXES

            let selectedBoxes = [];
            // if the selected box is not an array, then push the selected box to the selectedBoxes array
            if (!Array.isArray(selectedBox)) {
                selectedBoxes.push(selectedBox);
            }

            // if the selected box is an array, then push all the selected boxes to the selectedBoxes array
            if (Array.isArray(selectedBox)) {
                selectedBoxes = selectedBox;
            }

            // push the clicked box to the selectedBoxes array
            selectedBoxes.push(index);

            setSelectedBox(selectedBoxes); // Update the selected box state

            //update the sliders values according to the cloned color values

            if (clonedOutputColor === 'rgb(0,0,0)') {
                setRed(0);
                setGreen(0);
                setBlue(0);
                setCyan(0);
                setMagenta(0);
                setYellow(0);
                setBlack(0);
            } else if (clonedOutputColor === 'rgb(255,255,255)') {
                setRed(255);
                setGreen(255);
                setBlue(255);
                setCyan(255);
                setMagenta(255);
                setYellow(255);
                setBlack(255);
            } else {
                // Extract the RGB values from the color string and update the sliders
                const [r, g, b] = clonedOutputColor.match(/\d+/g);
                setRed(parseInt(r));
                setGreen(parseInt(g));
                setBlue(parseInt(b));
            }

        } else if (selectedBox === 'background') {
            // make it null if background is selected
            setSelectedBox(null);



        } else {
            setSelectedBox(index); // Update the selected box state

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
        }
    };


    // Function to create individual grid box elements
    const createGrid = (gridNumber, width, height) => {
        let grid = [];



        // Loop to create grid boxes (selectedBox is an array)
        for (let i = 0; i < gridNumber; i++) {
            grid.push(
                <div
                    key={i}
                    style={
                        {
                            width: `${width}px`,
                            height: `${height}px`,
                            backgroundColor:  // Use boxColors array to set background color
                                boxColors[i]
                        }

                    }
                    className={` cursor-pointer  shadow-none border-none hover:border-none btn rounded-none`}

                    onClick={() => handleBoxClick(i)} // Call handleBoxClick when a box is clicked
                ></div>
            );
        }

        return grid;
    };






    // Background color functionality

    // if selected Box is 'background' then change the background color with slider values

    if (selectedBox === 'background') {
        document.getElementById('main-div').style.backgroundColor = outputColor;
    }




    const [backgroundColor, setBackgroundColor] = useState('white'); // Initial background color

    const mainDivRef = useRef(null);

    const [isControlPressed, setIsControlPressed] = useState(false);
    const [isBackgroundSelected, setIsBackgroundSelected] = useState(false);

    //  If ctrl + click on the main div, trigger background selected

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Control') {
                setIsControlPressed(true);
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === 'Control') {
                setIsControlPressed(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (isControlPressed) {
            mainDivRef.current.style.cursor = 'crosshair';
        } else {
            mainDivRef.current.style.cursor = 'auto';
        }
    }, [isControlPressed]);

    useEffect(() => {
        if (isBackgroundSelected) {
            mainDivRef.current.style.cursor = 'crosshair';
        } else {
            mainDivRef.current.style.cursor = 'auto';
        }
    }, [isBackgroundSelected]);

    useEffect(() => {
        const handleMouseDown = (event) => {
            if (isControlPressed) {



                setSelectedBox('background');
                setIsBackgroundSelected(true);
            }
        };

        const handleMouseUp = (event) => {
            if (isBackgroundSelected) {
                setIsBackgroundSelected(false);
                setIsControlPressed(false);
                setSelectedBox(null);
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isControlPressed, isBackgroundSelected, outputColor]);



    // ------- HARD CODED GRID/BOX VALUES--------- //

    const rows = 2;
    const columns = 2;
    const width = 200;
    const height = 200;
    const verticalSpace = 10;
    const horizontalSpace = 10;

    //calculate grid number based on rows and columns
    const gridNumber = rows * columns;



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




    return (
        <div
            style={{ backgroundColor: backgroundColor }}
            ref={mainDivRef}
            id='main-div'
            className="min-h-screen pb-10 flex justify-center items-center">

            <div className="flex items-center gap-10 justify-center scale-90 lg:scale-100">
                {

                    <div
                        style={
                            {
                                //vertical and horizontal space between the grid boxes
                                gridGap: `${verticalSpace}px ${horizontalSpace}px`,
                            }
                        }
                        className={`grid grid-cols-1 ${gridClass}`}
                    >
                        {createGrid(gridNumber, width, height, verticalSpace, horizontalSpace)}
                    </div>

                }
            </div>


            {/* --------------- SLIDER PANEL ---------------- */}


            <div className="flex flex-col justify-center lg:justify-between bg-[#C4C4C4]  pt-10 rounded-2xl lg:scale-100 lg:absolute lg:bottom-14 lg:right-20 mt-10 lg:mt-0 w-[340px]">
                <div className="flex items-center  flex-wrap ">
                    <ColorSlider svg="/GS_handle.svg" color="white" value={black} onChange={(value) => handleSliderChange('Black', value)} />
                    <ColorSlider svg="/R_handle.svg" color="Red" value={red} onChange={(value) => handleSliderChange('Red', value)} />
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
                                `${red}.${green}.${blue}`
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






