// import React from 'react';
// import {Letters} from '../data/letters';
// import {categoryList} from '../data/categoryList';



// export const getLetter = (letters) : [string, string[]] => {
//   const index = getRandom(letters.length);
//   const currentLetter = letters[index];

//   // return the currentLetter and remove is from the array.
//   return [currentLetter, letters.splice(index, 1)];
// };

// function getRandom(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }

// export const getCategories = (categoryList, numberOfCategories): [string[], string[]] => {
//   const list: string[] = [];
//   for (let i = 0; i < numberOfCategories; i++) {
//     const index = getRandom(categoryList.length);
//     list.push(categoryList[index]);
//     categoryList.splice(index, 1);
//   }
  
//   return [list, categoryList];
// };