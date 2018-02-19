/*
 * You'll eventually be given instructions how to use this file
 * If you want to use it before then, you'll have to figure it out yourself
 */

// You don't actually want to fill *this* value in on line 9, but you'll see
// other places in this file where you'll replace the FILL_ME_IN with a
// different value.
var FILL_ME_IN = 'Fill this value in';








// describe('Introduction to Mocha Tests - READ ME FIRST', function() {
  // A Mocha test is just a function!
  // If the function throws an error when run, it fails.
  // If it doesn't throw an error when run, it doesn't fail.
  // To read more about mocha, visit mochajs.org

  // Once you've read and understood this section, please comment it out.
  // You will not be able to proceed with a failing test.

  //it('Throws an error so it fails', function() {
  //  throw new Error('Delete me!');
  //});

  // it('Doesn\'t throw an error, so it doesn\'t fail', function() {
  //   // This test doesn't really test anything at all! It will pass no matter what.
  //   var even = function(num){
  //     return num/2 === 0;
  //   }
  //   return even(10) === true;
  // });

  // In tests, we want to compare the expected behavior to the actual behavior.
  // A test should only fail if the expected behavior doesn't match the actual.
//   it('Throws an error when expected behavior does not match actual behavior', function() {
//     var even = function(num){
//       return num%2 === 0;
//     }
//
//     if(even(10) !== true) {
//       throw new Error('10 should be even!');
//     }
//   });
// });

//PSEUDO for project in comments.
//OUTLINE: I need one 'master function' that contains all of the different ways to test card number strings.
// This 'master function' should take into account whether the prefix is a range (e.g. 644-649) or possibly just a list
// (e.g. 2011, 2006, etc). Likewise the length might be best expressed as a length or list.
// So I will start by creating a function object that contains functions covering the combinations of length/prefixes that I will need.

//I will make my 'master function' an IIFE to ensure all of the instances produced by
// the function properties inside it that are necessary for testing are preserved.
var masterCreditCardFunction = (function() {
  var expect = chai.expect;
  //numberConstructor - a helper function to take a prefix or prefix array and length and generate a card number of that length.
  var numberConstructor = function(prefix, length) {
    var fillString = '12345678901234567890'; //at the longest we are dealing with a length of 19 with a prefix of length four, hence this is 15 long
    return ('' + prefix + fillString).slice(0, length);
  };

  //rangeArrayConstructor - another helper function to make a range array of numbers given initial and final values
  var rangeArrayConstructor = function(val1, val2) {
    return Array.from(new Array(val2-val1+1).keys()).map( val => val+val1 )
  };

  var iterateOverRangesToTest = function(cardName, prefixArr, lengthArr) {
    prefixArr.forEach( prefix => {
      lengthArr.forEach(length => {
        var cardNumber = numberConstructor(prefix, length);
        console.log(prefix + ";" + cardNumber + ";" + length);
        (function(aPrefix, aLength) {
          it('has a prefix of ' + aPrefix + ' and a length of ' + aLength, function() {
            expect(detectNetwork(cardNumber)).to.equal(cardName);
          });
        })(prefix, length);
      })
    })
  };

  //Now I begin with the prefix/range combos
  return {

    prefixListWithLengthList: function(cardName, prefixArr, lengthArr) {
      iterateOverRangesToTest(cardName, prefixArr, lengthArr);
    },

    prefixListWithLengthRange: function(cardName, prefixArr, length1, length2) {
      var lengthArr = rangeArrayConstructor(length1, length2);
      iterateOverRangesToTest(cardName, prefixArr, lengthArr);
    },

    prefixRangeWithLengthList: function(cardName, prefix1, prefix2, lengthArr) {
      var prefixArr = rangeArrayConstructor(prefix1, prefix2);
      iterateOverRangesToTest(cardName, prefixArr, lengthArr);
    },

    prefixRangeWithLengthRange: function(cardName, prefix1, prefix2, length1, length2) {
      var prefixArr = rangeArrayConstructor(prefix1, prefix2);
      var lengthArr = rangeArrayConstructor(length1, length2);
      iterateOverRangesToTest(cardName, prefixArr, lengthArr);
    }

  }

})();






describe('Diner\'s Club', function() {
//The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  masterCreditCardFunction.prefixListWithLengthList('Diner\'s Club', [38, 39], [14]);
});

describe('American Express', function() {
 // The American Express network always starts with a 34 or 37 and is 15 digits long
 masterCreditCardFunction.prefixListWithLengthList('American Express', [34, 37], [15]);
});

describe('Discover', function() {
//Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
  masterCreditCardFunction.prefixListWithLengthList('Discover', [6011, 65], [16, 19]);
  masterCreditCardFunction.prefixRangeWithLengthList('Discover', 644, 649, [16, 19]);
});

describe('Switch', function() {
//Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.
  masterCreditCardFunction.prefixListWithLengthList('Switch', [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759], [16, 18, 19]);
});

describe('Maestro', function() {
  masterCreditCardFunction.prefixListWithLengthRange('Maestro', [5018, 5020, 5038, 6304], 12, 19);
});

describe('China UnionPay', function() {
//China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  masterCreditCardFunction.prefixRangeWithLengthRange('China UnionPay', 622126, 622925, 16, 19);
  masterCreditCardFunction.prefixRangeWithLengthRange('China UnionPay', 6282, 6288, 16, 19);
  masterCreditCardFunction.prefixRangeWithLengthRange('China UnionPay', 624, 626, 16, 19);
});


describe('should support China UnionPay')
describe('should support Switch')
