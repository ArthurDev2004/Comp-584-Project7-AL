const fs = require('node:fs/promises'); // will be used to read in the file line by line 

// will be main entrypoint of the program 
async function main(){
    let highestSeatID = await calculateBoardingPass("./day5_input.txt");

    console.log(highestSeatID);

}

// calculates the seat id based on the given formula in the instructions 
function calculateSeatID(row, column){
    return row * 8 + column; 
}

async function calculateBoardingPass(filePath){

    const file = await fs.open(filePath);

    // variables will be used to determine the highest and lowest for each of the values 
    let currentRow = 0;
    let currentCol = 0;
    let highestSeatID = 0; 
    // will be the max and min numbers for rows and columns used in the process 
    let rowMax = 127;
    let rowMin = 0;
    let colMax = 7;
    let colMin = 0; 

    // will go through each line in the file line by line 
    for await(const line of file.readLines()){

        let fbString = line.slice(0, 7); // will get first seven characters 
        let lrString = line.slice(-3); // will get last three elements/characters in the string

        // goes through the F/B portion of the line 
        for (let i = 0; i < fbString.length; i++){

            // the last character, just choose either min or max depending on what it is 
            if (i === fbString.length-1){

                if (fbString[i] === "F")
                    currentRow = rowMin; 
                else if (fbString[i] == "B")
                    currentRow = rowMax;

                continue; // will continue to skip over the calculations that normally happen 
            }

            if (fbString[i] === "F"){
                   rowMax = Math.floor((rowMax + rowMin)/2); // the max value is the halfway point since need front of the range
            }
            else if (fbString[i] === "B"){
                   // use floor to get the integer equivalent 
                rowMin = Math.floor((rowMax+rowMin)/2) + 1; // the min value is the halfway point since back of the range is needed 
            }

        }


        

        // go through L/R for last three characters of the line 
        for (let i = 0; i < lrString.length; i++){

            // checks if last character to make the proper selection
            if (i === lrString.length-1){
                
                if (lrString[i] === "L"){
                    currentCol = colMin; 
                }
                else if (lrString[i] === "R"){
                    currentCol = colMax;
                }

                continue; 

            }

            if (lrString[i] === "L"){
                colMax = Math.floor((colMax+colMin)/2); 
            }
            else if (lrString[i] === "R"){
                colMin = Math.floor((colMax+colMin)/2) + 1; // need to add the one so that it is one more than the next cutoff for the max if L is shown
            }

        }

        // calculate the seating id for each line (and find the highest one)
        let currentSeatID = calculateSeatID(currentRow, currentCol);

        // if the current calculated seat id is higher than the highest, make it the new highest 
        if (currentSeatID > highestSeatID){
            highestSeatID = currentSeatID; 
        }


        // reset all of the values to do same for the new line in the input   
        rowMax = 127;
        rowMin = 0;
        colMax = 7;
        colMin = 0; 
        currentRow = 0;
        currentCol = 0;

    }


    return highestSeatID;
}

main();