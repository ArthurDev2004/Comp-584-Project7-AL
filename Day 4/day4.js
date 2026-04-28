const fs = require('node:fs/promises'); // will be used to read in the file line by line 
const { pid } = require('node:process');

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


    // if line is just a newline character, then it is considered the end of the passport credentials 
    for await (line of (file.readLines())){

        // check if empty line indicating that it is the end of that specific passport 
        if (line === ""){

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