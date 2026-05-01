const fs = require('node:fs/promises'); // will be used to read in the file line by line 



async function main(){

    //console.log(await determineLuggage("./day7_input.txt")); 
    console.log(await part2Calculation("./day7_input.txt")
    ); 
}

async function determineLuggage(filePath){

    // first need to read it in line by line and add to the Map/dictionary/hashmap to 
    const file = await fs.open(filePath); 

    let bagMap = new Map(); // will keep a key of the map, and a list of bags which are in it based on the input 


    for await (let line of file.readLines()){

        // split first the bag itself, and the contents it contains 
        let [bag, contents]  = line.split(" contain "); // will use the string "contain" as the splitting delimiter; include the spaces on both sides of contain to get rid of any confusing portions 

        // split the contents inside this bag individually to their actual contents 
        let specificContents = contents.split(/[,.]/); // will split on commas and periods 
        specificContents.pop();  // gets rid of the empty line 


        // add each of these contents to the dictionary which will be used to keep track 

        // remove the word bags from the end of the bag string itself, so only the color remains 
        let bagColor = bag.replace("bags", ""); // will replace the word bags with nothing
        bagColor = bagColor.trim(); // will get rid of any white spaces before and after the actual color 

        //// This should be a value for the key, which the KEY would be each of the bags after contain //////

        //bagMap.set(bagColor, []); // add an empty list currently, which will be populated with the colors that it has 

        // add each of the bag colors as a key in the map 
        for (let specificBag of specificContents){

            // remove either bag or bags from the string 
            specificBag = specificBag.replace("bags", "");
            specificBag = specificBag.replace("bag", ""); 

            // remove any whitespaces in the front or the back 
            specificBag = specificBag.trim();

            // get the number out of the front
            let number = specificBag.slice(0,1); // convert it to a number
            let specificBagColor = specificBag.slice(1); // will get rest of the string 
            specificBagColor = specificBagColor.trim(); // will get rid of white space around the string

            // have a way where the number and color are like a tuple so can be handeled better 

            // if it does not already exist in the map as a key, should add it 
            if (bagMap.has(specificBagColor) === false){
                bagMap.set(specificBagColor, [bagColor]); 
            }
            else { // if there is already that key and value, just update the value 
                bagMap.get(specificBagColor).push(bagColor);
            }

        }

    }


    // all of the colors will be inputted into the map, which will kind of be like an adjacency list for a graph and work like one as well 

    let BFSQueue = []; // will be used as a queue since BFS type search will happen 
    let bagsContainingShinyGold = 0;   
    let bagsAccountedFor = new Set(); // will keep track of the bags we already accounted for so in BFS it will not be accounted again 

    // add "shiny gold" to the queue to get it started 
    BFSQueue.push("shiny gold"); 
    bagsAccountedFor.add("shiny gold"); 


    while (BFSQueue.length !== 0){

        // pop out from the queue the value 
        let colorValue = BFSQueue.shift(); // dequeues first element from the queue 

        let thisBagHolds = bagMap.get(colorValue) || []; // gets the value of this color which is an array 

        // go through each of the arrays one by one and add to the queue so it can be checked out next, also check if not already in the set then can add the number by 1 

        for (let bag of thisBagHolds){

            // if this bag has not been traversed yet, then should add to the queue, and then also add to set and increemnet number by 1 
            if (bagsAccountedFor.has(bag) === false){

                bagsAccountedFor.add(bag); // add to the set 
                BFSQueue.push(bag); // add to the queue 
                bagsContainingShinyGold++; // increment number of bags that could possible have shiny gold by 1 
            }

        }

    }

    return bagsContainingShinyGold; // will return the number of bags that could contain shiny gold 
}


async function part2Calculation(filePath){

    // first need to read it in line by line and add to the Map/dictionary/hashmap to 
    const file = await fs.open(filePath); 

    let bagMap = new Map(); // will keep a key of the map, and a list of bags which are in it based on the input 

    // set up the map, but this way have it setup so that it is in the order that the input file is 
    for await (let line of file.readLines()){

        let [containingBag, containedBags] = line.split(" contain "); // will split the line into two parts where one part has what is contained, and other what is doing the containing 

        // get only the color from the containing bag 
        containingBag = containingBag.replace("bags", ""); // gets rid of bags at the end of each color 
        containingBag = containingBag.trim(); // gets rid of any white spaces 

        // add that color as key to the map 
        bagMap.set(containingBag, []); // will be an array of tuples

        // add each of the colors of bags it can hold and the number of each it can hold 

        let specificContents = containedBags.split(/[,.]/); // will split on commas and periods 
        specificContents.pop();  // gets rid of the empty line 

        // for each bag that is contained, seperate the color and the quantity 

        for (let specificBag of specificContents){

            let quantity = 0; 
            let color; 

            // trim the specificBag string to make sure there is no whitespace 
            specificBag = specificBag.trim(); 

            if (specificBag === "no other bags"){

                continue; // will not add any entry to the value of the key, since it contains no bags 
            }

            // get the number which is the quanityt 
            quantity = +specificBag.slice(0,1); // converts to a number 

            color = specificBag.slice(1); // will get everything till the end 
            color = color.replace("bags", ""); 
            color = color.replace("bag", "");
            color = color.trim(); 

            bagMap.get(containingBag).push([quantity, color]); // should append the color and quantity tuple to the value which is an array for that specific key color 


        }

    }


    // go through the map and do the calculations 
    let totalBagsContainedInGold = countTotalBagsContained("shiny gold", bagMap); 


    return totalBagsContainedInGold; 
}

// will be used to count total number of bags contained within the shiny gold bag 
function countTotalBagsContained(bagColor, bagMap){

    let total = 0; 

    for (let [quantity, color] of bagMap.get(bagColor)){

        total += quantity + (quantity * countTotalBagsContained(color, bagMap)); 

    }


    return total; 
}

main(); 