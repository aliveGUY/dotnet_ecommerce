import React from 'react';
import { useGetProductsQuery } from '../state/api';

function Home() {
  const { data, error, isLoading } = useGetProductsQuery()

  return <h2>Home</h2>;
}

export default Home;
