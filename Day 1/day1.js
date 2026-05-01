/*

Day 1

Node & MDN Documentation Citations

Asynchronous File Opening For Handling Files Line by Line, fs.open(): https://nodejs.org/api/fs.html#fsopenpath-flags-mode-callback

For Reading the File line by Line, fs.readLines(), async: https://nodejs.org/api/fs.html#filehandlereadlinesoptions

String Handling and Conversion Methods on String Objects: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

Destructuring Outputs/Return Values Which Are arrays so can have easier access to the values: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring

Unary Plus Operator used to convert string value from txt input to a number for calculations: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus

Used require statement to include the file system module with the new async/await promises syntax: https://nodejs.org/api/fs.html#file-system

*/

// should read in the data from the txt file from the advent of code website.

// read each line and add as an entry in array 

// find the two numbers which add to the value, then find the multiplication value between them 

const fs = require('node:fs/promises'); // will be used to read in the file line by line 

// create the function which will read in the data and do the proper conversion


async function readInData(filePath){
    const file = await fs.open(filePath); // opens and returns a file handle for handling the file (represents the file)
    let inputValues = []; // will be the array of number values that are collected from the input 


    // will be used to go through each of the lines in the input one by one (each "line" is an async promise that when it resolves is the string of that line)
    for await (line of file.readLines()){   

        inputValues.push(+line); // pushes the converted number to the array 
    }

    return inputValues; // will return the array once it has all been processed
}

// will do the actually logic portion of the day challenge 
function doCalculations(inputValues){

    // will compare each of the values to all other values 
    for (let i = 0; i < inputValues.length; i++){
        for (let j = i+1; j < inputValues.length; j++){
            
            if (inputValues[i] + inputValues[j] === 2020){
                return inputValues[i] * inputValues[j]; // will return the product of the two numbers which add up to desired sum since that is what problem wants 
            }

        }
    }

    return 0; // fallback just in case there are no values it will return 0 indicating nothing was multiplied 
}

function doCalculationsThreeNumbers(inputValues){

    for (let i = 0; i < inputValues.length; i++){
        for (let j = i+1; j < inputValues.length; j++){
            for (let k = j+1; k < inputValues.length; k++){
                if (inputValues[i] + inputValues[j] + inputValues[k] === 2020){
                    return inputValues[i] * inputValues[j] * inputValues[k]; 
                }
            }
        }
    }

    return 0; 
}


// will be the main entry point of the program (have to use it so there is no top level await in JS while also having a require statement)
async function main(){
    let inputValues = await readInData("./day1_input.txt"); 

    let product = doCalculationsThreeNumbers(inputValues); 

    console.log(product);
}




main();