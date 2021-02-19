import React, { useContext } from 'react';
import UserAnswersContext from '../contexts/UserAnswersContext'
import { pad } from './strings';

export const updateUserAnswers = (i, value) => {
  const userAnswers = useContext(UserAnswersContext);

  const index = pad(i);
  const temp = userAnswers.userAnswers;
  if (temp.has(index)) temp.delete(index);
  temp.set(index, value);
  userAnswers.updateUA(temp);
}