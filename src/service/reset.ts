import { pad } from './strings';

export const resetAnswersAndScores = numOfCategories => {
  const answer = new Map();
  for (let i = 0; i < numOfCategories; i++) {
    answer.set(pad(i), '');
  }
  console.log('answer:', answer);
  return answer;
}