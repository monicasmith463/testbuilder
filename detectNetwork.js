// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
var firstTwoDigits = cardNumber.slice(0, 2);
var firstThreeDigits = parseInt(cardNumber.slice(0, 3));
var firstFourDigits = parseInt(cardNumber.slice(0, 4));
var firstSixDigits = parseInt(cardNumber.slice(0, 6));
var firstDigit = firstTwoDigits[0];
var len = cardNumber.length;
var switchPrefixes =[4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759];
var maestroPrefixes = [5018, 5020, 5038, 6304];
var result;

 // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
if( len === 14 && ( firstTwoDigits === '38' || firstTwoDigits === '39' ) ) {
   result = 'Diner\'s Club';

 // The American Express network always starts with a 34 or 37 and is 15 digits long
} else if ( len === 15 && ( firstTwoDigits === '34' || firstTwoDigits === '37' ) ) {
   result = 'American Express';

 // MasterCard: start with 51-55; they have 16 digits
} else if ( (parseInt(firstTwoDigits)>50 && parseInt(firstTwoDigits)<56) && len === 16 ) {
   result = 'MasterCard';

 } else if ( ( len>11 && len<20 ) && maestroPrefixes.includes(firstFourDigits)) {
   result = 'Maestro';

//Order Switch before Visa because they have overlapping card numbers, and longer Switch prefixes get priority.
//Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.
} else if ( (( len === 18 || len === 16 ) || len === 19 ) &&
(switchPrefixes.includes(firstFourDigits) || switchPrefixes.includes(firstSixDigits)) ) {
    result = 'Switch';

//Visa: starts with 4, length is 13, 16, or 19
} else if ( (( len === 13 || len === 16 ) || len === 19 ) && firstTwoDigits[0] === '4' ) {
   result = 'Visa';

} else if (( len === 16 || len === 19 ) &&
(firstFourDigits === 6011 || (firstThreeDigits>643 && firstThreeDigits<650) || firstTwoDigits === '65')) {
  result = 'Discover';

//China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
} else if ( ( len>15 && len<20 ) &&
(( (firstSixDigits<=622925 && firstSixDigits>=622126) ||
(firstThreeDigits<=626 && firstThreeDigits>=624) ) ||
(firstFourDigits<=6288 && firstFourDigits>=6282) )
) {
  result = 'China UnionPay';
};
 // Note: `cardNumber` will always be a string




 // Once you've read this, go ahead and try to implement this function, then return to the console.
 return result
};



/*function checkDinersClub (length, firstTwoDigits) {
 if( length === 14 && ( firstTwoDigits === '38' || firstTwoDigits === '39' ) )
   return 'Diner\'s Club';
};

function checkAmericanExpress (length, firstTwoDigits) {
 if ( length === 15 && ( firstTwoDigits === '34' || firstTwoDigits === '37' ) )
   return 'American Express';
};

function checkMasterCard (length, firstTwoDigits) {
 firstTwoDigits = parseInt(firstTwoDigits);
 if( (firstTwoDigits>50 && firstTwoDigits<56) && length === 16 )
 return 'checkMasterCard';
};

function checkVisa (length, firstDigit) {
 if( ( length === 13 || length === 16 || length === 19 ) && firstDigit === 4 )
   return 'Visa';
};*/
