import React, { useEffect } from 'react'
import { Button, Stack, Table, TableCell, TableRow, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductsByIdQuery, useDeleteProductMutation } from '../state/api'


const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetProductsByIdQuery(id)
  const [deleteProduct, { isLoading: deleteLoading, data: response }] = useDeleteProductMutation()

  useEffect(() => {
    if (!deleteLoading && undefined !== response)
      navigate('/')
  }, [deleteLoading])

  if (isLoading) return 'Loading...'
  if (error) return 'Error'

  const { title, description, price, characteristic } = data

  return (
    <Stack>
      <Stack direction="row">
        <Button href={`/product/${id}/edit`}>Edit</Button>
        <Button onClick={() => deleteProduct(id)}>Delete</Button>
      </Stack>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="subtitle1">{description}</Typography>
      <Typography variant="subtitle1">{price}$</Typography>
      {characteristic && <Table size="small">
        <TableRow>
          <TableCell>key</TableCell>
          <TableCell>value</TableCell>
        </TableRow>
        {Object.entries(characteristic).map(([key, value], index) => (
          <TableRow key={index}>
            <TableCell>{key}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </Table>}
    </Stack>
  )
}

export default Product