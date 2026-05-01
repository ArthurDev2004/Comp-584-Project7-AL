/*

Day 4

Node & MDN Documentation Citations

Asynchronous File Opening For Handling Files Line by Line, fs.open(): https://nodejs.org/api/fs.html#fsopenpath-flags-mode-callback

JS Map Object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

JS Set Object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

For Reading the File line by Line, fs.readLines(), async: https://nodejs.org/api/fs.html#filehandlereadlinesoptions

String Handling and Conversion Methods on String Objects: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

Destructuring Outputs/Return Values Which Are arrays so can have easier access to the values: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring

Used Logical AND/OR operators to check if conditions are met in the way specified for the problem: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators

Unary Plus Operator used to convert string value from txt input to a number for calculations: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus

Used require statement to include the file system module with the new async/await promises syntax: https://nodejs.org/api/fs.html#file-system

*/


const fs = require('node:fs/promises'); // will be used to read in the file line by line 


// will be main entrypoint into the program 
async function main(){

    let validPassports = await determineValidPassport("./day4_input.txt");

    console.log(validPassports);

}



async function determineValidPassport(filePath){

    // will read in the lines of the file input line by line 
    const file = await fs.open(filePath); 

    let validPassports = 0; 

    // will be flags used to indicate whether all of the credentials are present 
    let byrPresent = false;
    let iyrPresent = false;
    let eyrPresent = false;
    let hgtPresent = false;
    let hclPresent = false;
    let eclPresent = false;
    let pidPresent = false;
    let cidPresent = false;
    
    let passportDictionary = new Map(); 
    let eyeColorSet = new Set(); // will be used to store the values that can be present and valid within the eye color field 
    eyeColorSet.add("amb");
    eyeColorSet.add("blu");   
    eyeColorSet.add("brn");
    eyeColorSet.add("gry");
    eyeColorSet.add("grn");
    eyeColorSet.add("hzl");
    eyeColorSet.add("oth");

    // if line is just a newline character, then it is considered the end of the passport credentials 
    for await (line of (file.readLines())){

        // check if empty line indicating that it is the end of that specific passport 
        if (line === ""){

            // check all credentials that were gathered before it and see which is present in the current passport 
            if (passportDictionary.has('byr') === true)
            {
                let birthYear = +passportDictionary.get('byr'); 

                // does the additional check required in part two 
                if (birthYear >= 1920 && birthYear <= 2002)
                    byrPresent = true;

            }
            if (passportDictionary.has('iyr') === true)
            {
                let issueYear = +passportDictionary.get('iyr'); 

                // does the additional check required in part two 
                if (issueYear >= 2010 && issueYear <= 2020)
                    iyrPresent = true;

            }
            if (passportDictionary.has('eyr') === true)
            {
                let expirationYear = +passportDictionary.get('eyr');  // converts the string which is the value to a number representation for the purposes of comparing

                // does the additional check required in part two 
                if (expirationYear >= 2020 && expirationYear <= 2030)
                    eyrPresent = true;

            }
            if (passportDictionary.has('hgt') === true){

                let height = passportDictionary.get("hgt");
                let units = height.slice(-2); // will return the last two characters of the string, which if valid should be the units 
                let heightNumber = +height.slice(0,-2); // will get the value of the height in number form

                // will first determine the units, then check the numbers since they are different based on the units that are provided 
                if (units === "cm"){
                    
                    if (heightNumber >= 150 && heightNumber <= 193)
                        hgtPresent = true;

                }
                else if (units === "in"){

                    if (heightNumber >= 59 && heightNumber <= 76)
                        hgtPresent = true; 

                }
            }
            if (passportDictionary.has('hcl') === true){

                let hairColor = passportDictionary.get('hcl'); 

                // check if first digit is a # 
                if (hairColor[0] === '#'){

                    let hairColorNumber = hairColor.slice(1); // will get everything but the first 

                    if (hairColorNumber.length === 6)
                        hclPresent = true; 

                }

            }         
            if (passportDictionary.has('ecl') === true){

                // if the color is present in the set, then it is valid 
                if (eyeColorSet.has(passportDictionary.get('ecl')) === true)
                    eclPresent = true;    
            
            }
            if (passportDictionary.has('pid') === true){

                let passportID = passportDictionary.get('pid');
                
                if (passportID.length === 9)
                    pidPresent = true;

            }   
            if (passportDictionary.has('cid') === true)
                cidPresent = true;   

            if (byrPresent === true && iyrPresent === true && eyrPresent === true && hgtPresent === true && hclPresent === true && eclPresent === true && pidPresent === true){
                validPassports++; // since all of the necessary requirements are there, it is considered a valid passport 
            }




            // clear the map of its current key value pairs 
            passportDictionary.clear(); 
            byrPresent = false;
            iyrPresent = false;
            eyrPresent = false;
            hgtPresent = false;
            hclPresent = false;
            eclPresent = false;
            pidPresent = false;

            continue; // should not do the regular reading in for this case 
        }

        // create a dictionary/map of the keys and their values 

        // split the string with spaces 
        let keyValuePairs = line.split(" "); 

        // will go through each key value pair which is present in that line 
        for (pair of keyValuePairs){
            // split based on the colon
            let [key, value] = pair.split(":"); 
            passportDictionary.set(key, value); // will add the key value pair to the dictionary 
        }

    }

    // to handle the last passport which would not be included within the original logic 
     // check all credentials that were gathered before it and see which is present in the current passport 
    if (passportDictionary.has('byr') === true)
                byrPresent = true;
    if (passportDictionary.has('iyr') === true)
                iyrPresent = true;
    if (passportDictionary.has('eyr') === true)
                eyrPresent = true;      
    if (passportDictionary.has('hgt') === true)
                hgtPresent = true;
    if (passportDictionary.has('hcl') === true)
                hclPresent = true;             
    if (passportDictionary.has('ecl') === true)
                eclPresent = true;    
    if (passportDictionary.has('pid') === true)
                pidPresent = true;   
    if (passportDictionary.has('cid') === true)
                cidPresent = true;   

    if (byrPresent === true && iyrPresent === true && eyrPresent === true && hgtPresent === true && hclPresent === true && eclPresent === true && pidPresent === true){
        validPassports++; // since all of the necessary requirements are there, it is considered a valid passport 
    }


    return validPassports; 

}

main();