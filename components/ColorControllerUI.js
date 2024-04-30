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
    let [selectedBox, setSelectedBox] = useState(null); // State to keep track of the selected box

    console.log('Selected Box:', selectedBox)

    // Function to handle changing the output color for a specific box
    const handleColorChange = (newColor) => {
        setOutputColor(
            newColor
        );
        // If a box is selected update its color, if multiple box selected updated multiple box color (selextedBox is an array)
        if (selectedBox !== null) {
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
            // if (event.key === 'Shift' && selectedBox !== null) {
            //     setClonedOutputColor(boxColors[selectedBox]);
            // }

            // selected box is array now
            if (event.shiftKey && selectedBox !== null) {
                // setClonedOutputColor(boxColors[selectedBox]);
                //    selected box either can be a single value or can be an array of values

                if (selectedBox !== null) {
                    if (Array.isArray(selectedBox)) {
                        setClonedOutputColor(boxColors[selectedBox[0]]);
                    } else {
                        setClonedOutputColor(boxColors[selectedBox]);
                    }
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

        if (clonedOutputColor !== null) {

            const newBoxColors = [...boxColors]; // Create a copy of boxColors
            newBoxColors[index] = clonedOutputColor; // Update the color of the selected box
            setBoxColors(newBoxColors); // Update boxColors state

            // setSelectedBox(selectedBox); // Update the selected box state

            // make all the box (clicked after shift key) as an array of selected boxes

            let selectedBoxes = [];

            // for (let i = 0; i < boxColors.length; i++) {
            //     if (boxColors[i] === clonedOutputColor) {
            //         selectedBoxes.push(i);
            //     }
            // }

            // LOGIC FOR SELECTING MULTIPLE BOXES 2
            // Select all the box that matched the color of clonedOutputColor

            // boxColors.forEach((color, i) => {
            //     if (color === clonedOutputColor) {
            //         selectedBoxes.push(i);
            //     }
            // }
            // );

            // COMBINED LOGIC FOR SELECTING MULTIPLE BOXES

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


    // update box color instantly when cloned color is present and box is clicked

    // useEffect(() => {
    //     if (clonedOutputColor !== null) {
    //         const newBoxColors = [...boxColors]; // Create a copy of boxColors
    //         newBoxColors[selectedBox] = clonedOutputColor; // Update the color of the selected box
    //         setBoxColors(newBoxColors); // Update boxColors state

    //         // select multiple boxes as many boxes are clicked with same color as cloned color

    //         setSelectedBox(selectedBox);

    //     }
    // }, [selectedBox, clonedOutputColor, boxColors]);




    // Function to create individual grid box elements
    const createGrid = (gridNumber) => {
        let grid = [];

        // Loop to create grid boxes (selectedBox is an array)
        for (let i = 0; i < gridNumber; i++) {
            grid.push(
                <div
                    key={i}
                    className={`w-[120px] h-[120px] lg:w-[200px] lg:h-[200px]  cursor-pointer  " border-none hover:border-none btn rounded-none  " 
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
            title: 'Enter grid number:',
            input: 'number',
            inputAttributes: {
                min: 1,
                max: 12,
                step: 1,
            },
            showCancelButton: true,
            confirmButtonText: 'Create Layout',
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




    const [backgroundColor, setBackgroundColor] = useState('white'); // Initial background color

    const mainDivRef = useRef(null);

    useEffect(() => {
        // Function to handle clicks outside the grid area
        const handleClickOutside = (event) => {
            // Check if the click occurred outside the grid area
            if (mainDivRef.current && !mainDivRef.current.contains(event.target)) {
                // Change the background color of min-div only if grid is not created
                if (isGridCreated) {
                    console.log('Nothing')
                }
            }
        };

        // Add event listener to document body when component mounts
        document.addEventListener('click', handleClickOutside);

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGridCreated]); // Re-run effect when isGridCreated changes


    return (
        <div
            style={{ backgroundColor: backgroundColor }}
            ref={mainDivRef}
            id='main-div'
            className="min-h-screen pb-10 flex justify-center items-center">

            <div className="flex items-center gap-10 justify-center scale-90 lg:scale-100">
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

            {
                isGridCreated && (
                    <div
                        onClick={resetLayout}
                        className=" lg:absolute lg:bottom-14 lg:left-20 w-[300px] cursor-pointer">
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






