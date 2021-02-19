import React from 'react';
import { getContext, getProvider } from './helper';

const CategoryContext = React.createContext({});

function useCategpry() {
  return getContext(CategoryContext, 'CategoryContext');
};

function CategoryProvider(props: any) {
  const [categories, setCategories] = React.useState([]);
  return getProvider(CategoryContext, categories, setCategories, props);
}

export default { CategoryProvider, useCategpry };
