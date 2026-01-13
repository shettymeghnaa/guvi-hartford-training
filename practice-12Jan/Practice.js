// Constants for pricing
const FLAT_RATE_PER_SFT = 2500; // Rs per sq ft
const PARKING_RATE = 100000; // Rs per parking (1 lakh)
const HIGH_RISE_ADDITIONAL_RATE = 10; // Rs per sq ft after 5th floor
const HIGH_RISE_START_FLOOR = 5;

// Function to calculate total cost
function calculateTotalCost(area, floor, parkings) {
    let baseCost = area * FLAT_RATE_PER_SFT;
    let highRiseCost = 0;
    if (floor > HIGH_RISE_START_FLOOR) {
        highRiseCost = area * HIGH_RISE_ADDITIONAL_RATE;
    }
    let parkingCost = parkings * PARKING_RATE;
    return baseCost + highRiseCost + parkingCost;
}

// Example data for 2BHK
const bhk2Area = 1000; // sq ft
const bhk2Floor = 3; // below 5th floor, no high rise charge
const bhk2Parkings = 1;

// Example data for 3BHK
const bhk3Area = 1500; // sq ft
const bhk3Floor = 7; // above 5th floor, high rise charge applies
const bhk3Parkings = 2;

// Calculate and display costs
console.log("Total cost for 2BHK flat:");
console.log("Area:", bhk2Area, "sq ft");
console.log("Floor:", bhk2Floor);
console.log("Parkings:", bhk2Parkings);
console.log("Total Cost: Rs.", calculateTotalCost(bhk2Area, bhk2Floor, bhk2Parkings));

console.log("\nTotal cost for 3BHK flat:");
console.log("Area:", bhk3Area, "sq ft");
console.log("Floor:", bhk3Floor);
console.log("Parkings:", bhk3Parkings);
console.log("Total Cost: Rs.", calculateTotalCost(bhk3Area, bhk3Floor, bhk3Parkings));