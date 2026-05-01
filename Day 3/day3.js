/*

Day 3

Node & MDN Documentation Citations

Asynchronous File Opening For Handling Files Line by Line, fs.open(): https://nodejs.org/api/fs.html#fsopenpath-flags-mode-callback

For Reading the File line by Line, fs.readLines(), async: https://nodejs.org/api/fs.html#filehandlereadlinesoptions

String Handling and Conversion Methods on String Objects: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

Destructuring Outputs/Return Values Which Are arrays so can have easier access to the values: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring

Used remainder/modulo operator for wrap around logic: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder

Used require statement to include the file system module with the new async/await promises syntax: https://nodejs.org/api/fs.html#file-system

*/



const fs = require('node:fs/promises'); // will be used to read in the file line by line 

// will be the main entrypoint of the program 
async function main(){

    let slopeTreeProducts = 1;

    let inputMap = await readInData("./day3_input.txt");

    // let treesEncountered = calculateTreeEncounters(inputMap, 3, 1); 

    let slopes = [[1, 1], [3, 1], [5,1], [7, 1], [1,2]]; // the slope combinations with right and down values for part two 

    for (const [right, down] of slopes){

        let treesEncountered = calculateTreeEncounters(inputMap, right, down); 

        slopeTreeProducts *= treesEncountered; 
    }

    console.log(slopeTreeProducts);

}

// wil read in data and return the proper 2d array which will represent the map that the input is trying to emulate 
async function readInData(filePath){
    const file = await fs.open(filePath);
    let inputMap = []; // will be an array of arrays, which will setup 2d array type representation of the map being inputted 

    for await (const line of file.readLines()){

        let lineArray = line.split(""); // will return an array where each character is an individual array element 

        inputMap.push(lineArray); // will push the array as a new element in the overall larger array representing the 2d array layout of the map input 

    }

    return inputMap; // will return the two dimensional array which represents the map input
}

// will calculate the number of trees which are encountered in the input map representation
function calculateTreeEncounters(inputMap, right, down){

    // the top left hand 
    let currentRow = 0;
    let currentColumn = 0; 
    let treesEncountered = 0; // will count number of trees encountered 

    // will continue until it has reached the bottom (bottom row) of the map 
    while (currentRow < inputMap.length){

        currentRow += down; // will decrease the row by the down amount 
        currentColumn += right; // will increase the column by the right amount 

        // check to see if the row has gone out of bounds 
        if (currentRow >= inputMap.length){
            break; 
        }

        // modulo operator added to not allow the column values to go over the edge and instead wrap around all the way until the final row 
        if (inputMap[currentRow][currentColumn % inputMap[currentRow].length] === '#'){ // '#' indicates a tree so whenever it is come across should increment the trees encounter accumulator 
            treesEncountered++; // increments by 1 
        }

    }

    return treesEncountered;
}


main();