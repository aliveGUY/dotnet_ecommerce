import React from 'react'
import { useGetProductsQuery } from '../state/api'
import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'

function Home() {
  const { data, error, isLoading } = useGetProductsQuery()

  if (isLoading) return 'Loading...'
  if (error) return 'Error'

  return (
    <Stack direction="row">
      {data.map((product, key) => (
        <Card key={key}>
          <CardContent>
            <Typography>{product.title}</Typography>
            <Typography>{product.description}</Typography>
          </CardContent>
          <CardActions>
            <Button href={`/product/${product.id}`}>View</Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  )
}

export default Home
