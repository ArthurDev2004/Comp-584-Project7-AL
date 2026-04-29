const fs = require('node:fs/promises'); // will be used to read in the file line by line 


async function main(){
    let totalCount = await decodeQuestionnaireResults("./day6_input.txt");

    console.log(totalCount); 

}


async function decodeQuestionnaireResults(filePath){

    const file = await fs.open(filePath); // creates a file handler which will allow access to the file on a line by line basis 

    let totalYesCount = 0; // will be used to determine the total yes count of each individual group together 
    let currentYesCount = 0; // will be used to determine the yes count of this group 

    let answeredYesSet = new Set(); // will be used to keep track of which questions have been answered by a group 

    // will go line by line, but whenever there is an empty line, that indicates we have reached the next group of people 
    for await(const line of file.readLines()){

        // empty line being returned in Node signifies that it is basically a newline character (newline character is the delimiter and is discarded when being read in (kind of like fstream and getline in C++))
        if (line === ""){

            currentYesCount = answeredYesSet.size; // the size of the set is the number of unique characters which showed up for a specific group

            totalYesCount += currentYesCount; 

            answeredYesSet.clear(); // the set is cleared of all of its characters, so can be clean for the next group

        }

        // go through each character in the line, and add it to a set 
        for (const char of line){

            if (answeredYesSet.has(char) === false){
                answeredYesSet.add(char); // if does not exist in the set, should add it to the set 
            }
        }

    }

    // need to add for the case of the last group that will not have an empty line under them 


    currentYesCount = answeredYesSet.size; // the size of the set is the number of unique characters which showed up for a specific group

    totalYesCount += currentYesCount; 

    answeredYesSet.clear(); // the set is cleared of all of its characters, so can be clean for the next group  
    
    
    return totalYesCount; 
}

main();