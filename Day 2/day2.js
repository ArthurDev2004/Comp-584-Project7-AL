const fs = require('node:fs/promises'); // will be used to read in the file line by line 

// will be where the program is inputted the data, and the calculations are done in a line by line basis
async function doCalculations(filePath){

    let file = await fs.open(filePath);
    let validPasswords = 0; // initialize the accumulator to count number of valid passwords 

    // will handle the file on a line to line basis 
    for await (line of file.readLines()){
        
        let [rules, password] = line.split(':'); // will return two strings, first half which indicate the rules, and the second half which is the actual password

        let [min, max, character] = maxMinOccurrences(rules); 

        // now will check if the rule is satisfied 
        if (checkAgainstRule(min, max, character, password) === true){
            validPasswords++; 
        }
    }


    return validPasswords; // will return number of valid passwords 
}

// will return a boolean value indicating whether the password is valid or not 
function checkAgainstRule(min, max, character, password){

    let characterCount = 0; 

    for (ch of password){
        if (ch === character)
            characterCount++; // will increment the characterCount for each time the character is shown in the password 
    }

    // check against the established rules for the character count 
    if (characterCount < min || characterCount > max){
        return false; // will return false if character count is less than minimum or more than the max 
    }

    
    return true; // will true if otherwise satisfies 
}

// will be used to get the max number of times it should occur and the least number of times it occurs in string (the specific character)
function maxMinOccurrences(rules){

    let [numbers, character] = rules.split(" ");

    let [min, max] = numbers.split("-"); 

    // convert the strings into numbers 
    min = +min; 
    max = +max;

    return [min, max, character]; // will return everything which is needed to evaluate the logic 

}

// will check if password is valid based on the new rule specified in part 2 
function checkAgainstNewRule(position1, position2, character, password){

    if (password[position1] === character && password[position2] === character)
        return false; // will return false since rules specify only one position should have that character 
    else if (password[position1] === character || password[position2] === character){
        return true; // if one of the positions is the character then it should return true, and since the case where both are the character is checked in the if condition before this is fine 
    }

}

// will handle the new interpretation of the password policy specified in part two 
async function newInterpretationCalculation(filePath){

    let file = await fs.open(filePath);
    let validPasswords = 0; 

    for await (line of file.readLines()){
        let [rules, password] = line.split(':'); // will return two strings, first half which indicate the rules, and the second half which is the actual password

        let [position1, position2, character] = maxMinOccurrences(rules); // will return the positions specified in the rules, as well as the character that the rule will be applied based on 
    
        if (checkAgainstNewRule(position1, position2, character, password) === true){
            validPasswords++;
        }
        
    
    }

    return validPasswords; 
}

// will be entrypoint into the program 
async function main(){

    //let validPasswords = await doCalculations("./day2_input.txt");
    let validPasswords = await newInterpretationCalculation("./day2_input.txt");


    console.log(validPasswords);

}

main();