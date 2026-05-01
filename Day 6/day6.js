/*

Day 6

Node & MDN Documentation Citations

Asynchronous File Opening For Handling Files Line by Line, fs.open(): https://nodejs.org/api/fs.html#fsopenpath-flags-mode-callback

JS Map Object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

JS Set Object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

For Reading the File line by Line, fs.readLines(), async: https://nodejs.org/api/fs.html#filehandlereadlinesoptions

String Handling and Conversion Methods on String Objects: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

Destructuring Outputs/Return Values Which Are arrays so can have easier access to the values: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring

Used require statement to include the file system module with the new async/await promises syntax: https://nodejs.org/api/fs.html#file-system

*/




const fs = require('node:fs/promises'); // will be used to read in the file line by line 


async function main(){
   // let totalCount = await decodeQuestionnaireResults("./day6_input.txt");
    let allYesCount = await decodeQuestionnaireResultsPartTwo("./day6_input.txt"); 


    console.log(allYesCount); 

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

// check if the amount of times a character is present and compare to the number of people in the group, if it is equal or of greater value, then it should be counted as a question which everyone answered yes
async function decodeQuestionnaireResultsPartTwo(filePath){

    const file = await fs.open(filePath); // creates a file handler which will allow access to the file on a line by line basis 

    let totalYesCount = 0; // will be used to determine the total yes count of each individual group together 
    let currentYesCount = 0; // will be used to determine the yes count of this group 
    let currentGroupMemberCount = 0; // will keep track of number of people in the group

    let answeredYesMap = new Map(); // will be used to keep track of which questions have been answered by a group 

    // will go line by line, but whenever there is an empty line, that indicates we have reached the next group of people 
    for await(const line of file.readLines()){

        // empty line being returned in Node signifies that it is basically a newline character (newline character is the delimiter and is discarded when being read in (kind of like fstream and getline in C++))
        if (line === ""){

            // go through each of the answers that were recorded yes based on the group data
            // whichever one that has number of present equal to number of people in group should be accounted for 

            for (const [key, numPresent] of answeredYesMap){

                // if the number of times that a character is present in the group is equal to the number of people in the group, then it should be counted that everyone answered that question with a yes
                if (numPresent === currentGroupMemberCount)
                    currentYesCount++; 
            }

            totalYesCount += currentYesCount; 

            // reset the group member count, and the current yes count 

            currentYesCount = 0;
            currentGroupMemberCount = 0;

            answeredYesMap.clear(); // the set is cleared of all of its characters, so can be clean for the next group

            continue; // will continue past the regular calculations
        }

        // go through each character in the line, and add it to a set 
        for (const char of line){

            if (answeredYesMap.has(char) === false){
                answeredYesMap.set(char, 1); // adds the character present for this specific line, and that it is present one time thus far
            }
            else {

                answeredYesMap.set(char, answeredYesMap.get(char) + 1); // will increment the number of times present in the group 

            }

        }

        currentGroupMemberCount++; // will increment to show that one group member has been accounted for 

    }

    // need to add for the case of the last group that will not have an empty line under them 

    for (const [key, numPresent] of answeredYesMap){

        // if the number of times that a character is present in the group is equal to the number of people in the group, then it should be counted that everyone answered that question with a yes
        if (numPresent === currentGroupMemberCount)
            currentYesCount++; 
    }

    totalYesCount += currentYesCount; 

    answeredYesMap.clear(); // the set is cleared of all of its characters, so can be clean for the next group  
    
    
    return totalYesCount; 
}

main();