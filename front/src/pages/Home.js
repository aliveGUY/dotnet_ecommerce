import React from 'react'
import { useGetProductsQuery } from '../state/api'
import { Container, Stack, Typography } from '@mui/material'
import ProductCard from '../components/products/ProductCard'

function Home() {
  const { data, error, isLoading } = useGetProductsQuery()

  if (isLoading) return 'Loading...'
  if (error) return 'Error'

  return (
    <Container maxWidth="xl">
      <Stack py={5}>
        <Typography variant="body1">Tagline</Typography>
        <Typography variant="h4" fontWeight={800}>Products</Typography>
        <Typography variant="subtitle2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Typography>
      </Stack>

      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={6}>
        {data.map((product, key) => <ProductCard key={key} product={product} />)}
      </Stack>
    </Container>
  )
}

export default Home
