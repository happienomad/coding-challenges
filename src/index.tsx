import React from "react";

export interface TreeNode {
  id: number;
  values: number[];
  children?: TreeNode[];
}

/**
 * Test One: Find an ID in a simple tree
 * 
 * Given a tree of items with the interface `TreeNode` above,
 * Implement a method which returns the ID of the first node where `values`
 * in the node matches `value` passed into the method
 * 

Example tree:

const items = [
  {id: 1, values: [100, 101]},
  {id: 2, values: [200, 201]},
  {id: 3, values: [300, 301], children: [
    {id: 10, values: [1000, 1001]},
    {id: 9, values: [900, 901]},
    {id: 8, values: [800, 801], children: [
      {id: 7, values: [700, 701]},
      {id: 6, values: [600, 601]}
    ]}
  ]}
]

findIdInTreeByValue(items, 601) // => 6

 * See `index.spec.tsx` for test cases
 */

export function findIdInTreeByValue(
  items: TreeNode[],
  value: number
): number | undefined {
  for (let item of items) {
    if (item.values) {
      const index = item.values.indexOf(value);
      if (index > -1) {
        return item.id;
      }
    }

    if (item.children) {
      return findIdInTreeByValue(item.children, value);
    }
  }
  return;
}

/**
 * Test Two: Consecutive numbers in an array
 * Given an array of unsorted numbers, find the longest sequence
 * of consective numbers in the array

Examples:

consecutiveNumbersLength([8, 4, 2, 1, 6, 5]) // => 3 (4,5,6)
consecutiveNumbersLength([5, 5, 3, 1]) // => 1

 * See `index.spec.tsx` for test cases
 */

export function consecutive(numbers: number[]): number {
  if (numbers.length === 1) {
    return 1;
  }

  if (numbers.length === 0) {
    return 0;
  }
  if (numbers.length > 1) {
    // Sorting numbers can be done in two ways
    // 1. using Array.prototype.sort method with a callback method
    // 2. implement sorting algorithm for which I added the code
    // after this function. I commented it out and left it for reference.
    let sortedNumbers = numbers.sort((a, b) => a - b);
    let counter = 1;
    let consectiveCount = 1;
    for (let i = 0; i < numbers.length; i++) {
      if (sortedNumbers[i] + 1 === sortedNumbers[i + 1]) {
        ++counter;
      } else {
        consectiveCount = counter;
        counter = 1;
      }
    }
    return consectiveCount;
  }
}

// function sort(numbers) {
//   if (numbers.length < 2) {
//     return numbers;
//   }
//   const index = Math.floor(Math.random() * numbers.length);
//   let pivot = numbers[index];
//   let left = [],
//     right = [],
//     equal = [];
//   for (let number of numbers) {
//     if (number > pivot) {
//       right.push(number);
//     } else if (number < pivot) {
//       left.push(number);
//     } else {
//       equal.push(number);
//     }
//   }
//   return sort(left)
//     .concat(equal)
//     .concat(sort(right));
// }

/**
 * Test Three: Highlight a text match
 * Implement a method which highlights the portion of text which matches
 * a given substring (case-insensitive) by returning a ReactNode that
 * wraps the matches in <strong> tags
 * 

Example:
highlightMatch('Micheal Rosen', 'ros') =>

As JSX
<>
  Micheal <strong>Ros</strong>en
</>

As an array of JSX
[
  <React.Fragment key={0}>Micheal </React.Fragment>,
  <strong key={1}>Ros</strong>,
  <React.Fragment key={2}>en</React.Fragment>
]

 * See `index.spec.tsx` for test cases
 */

/*
  Implemented highlightMatch using two ways.
  - In the first method, I looped through the string to find the 
  matches and then created the ReactNode out of it.
  - In the second method, I used Regular expressions to split the 
    string at matched indices and then used Array.map function to build
    ReactNodes. Please look for highlightMatchUsingRegex function commented
    out after highlightMatch function
*/
export function highlightMatch(
  text: string,
  matchString: string
): React.ReactNode {
  let pointer = 0;
  let ReactNodes = [];
  while (pointer < text.length) {
    let stringSlice = text.substr(pointer);
    let matchPosition = stringSlice.toLowerCase().indexOf(matchString);
    if (matchPosition > -1) {
      if (matchPosition > 0) {
        ReactNodes.push(
          <React.Fragment key={ReactNodes.length}>
            {stringSlice.substr(0, matchPosition)}
          </React.Fragment>
        );
        pointer += matchPosition;
      }
      ReactNodes.push(
        <strong key={ReactNodes.length}>
          {stringSlice.substr(matchPosition, matchString.length)}
        </strong>
      );
      pointer += matchString.length;
    } else {
      ReactNodes.push(
        <React.Fragment key={ReactNodes.length}>{stringSlice}</React.Fragment>
      );
      pointer = text.length;
    }
  }
  return ReactNodes;
}

// function highlightMatchUsingRegex(text: string, matchString: string) {
//   var stringPieces = text.split(new RegExp(`(${matchString})`, "gi"));
//   return stringPieces
//     .filter(piece => piece !== "")
//     .map((piece, index) => {
//       if (piece.toLowerCase() === matchString) {
//         return <strong key={index}>{piece}</strong>;
//       } else {
//         return <React.Fragment key={index}>{piece}</React.Fragment>;
//       }
//     });
// }
