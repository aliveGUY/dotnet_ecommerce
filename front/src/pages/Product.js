import React, { useEffect, useState } from 'react'
import { Box, Breadcrumbs, Button, Container, Divider, Grid, Link, Rating, Stack, Table, TableCell, TableRow, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductsByIdQuery, useDeleteProductMutation } from '../state/api'
import { FlashAuto, StarRateRounded } from '@mui/icons-material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import image from '../static/images/default-image.jpg'

const details = ['Characteristics', 'Description', 'Policies']

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedDetail, setSelectedDetail] = useState(details[0])
  const [selectedImage, setSelectedImage] = useState(image)
  const { data, isLoading, error } = useGetProductsByIdQuery(id)
  const [deleteProduct, { isLoading: deleteLoading, data: response }] = useDeleteProductMutation()

  useEffect(() => {
    if (!deleteLoading && undefined !== response)
      navigate('/')
  }, [deleteLoading])

  useEffect(() => {
    if (!isLoading && data?.images?.length > 0) {
      setSelectedImage(data?.images[0])
    }
  }, [isLoading])

  // if (isLoading) return 'Loading...'
  // if (error) return 'Error'

  const { title = 'Sample Text', description = 'N/A', policies = 'N/A', price = 0, characteristic = {}, images = [] } = data || {}

  return (
    <Container maxWidth="xl">
      <Grid
        container
        columns={{ xs: 1, md: 3 }}
        py={8}
        alignItems="center"
        sx={{
          display: { xs: 'grid', md: 'flex' }
        }}
      >

        <Grid item xs={1}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Typography>Shop all</Typography>
            <Typography>Category</Typography>
            <Typography>Product Name</Typography>
          </Breadcrumbs>
          <Typography variant="h4" fontWeight={800}>{title}</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5" fontWeight={600}>${price}</Typography>
            <Divider orientation="vertical" flexItem sx={{ borderWidth: 1.5 }} />
            <Stack>
              <Rating value={2.5} precision={0.5} />
              <Typography>(3.5 stars) * 10 reviews</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={3}>
            {details.map((item, key) => (
              <Link
                underline={item === selectedDetail ? 'always' : 'none'}
                onClick={() => setSelectedDetail(item)}
                sx={{ cursor: 'pointer' }}
              >{item}</Link>
            ))}
          </Stack>
          <Typography>{description}</Typography>
        </Grid>

        <Grid item xs={1} row={1} maxWidth={500} width="100%" mx="auto" gridRow={1}>
          <Stack spacing={2}>
            <Box
              component="img"
              width="100%"
              sx={{ aspectRatio: 1 }}
              src={selectedImage}
            />
            <Stack
              direction="row"
              sx={{ overflowX: 'auto' }}
              spacing={2.2}
              pb={1}
            >
              {images.map((image, key) => (
                <Box
                  onClick={() => setSelectedImage(image)}
                  key={key}
                  component="img"
                  width={85}
                  sx={{ aspectRatio: 1, cursor: 'pointer' }}
                  src={image}
                />
              ))}
              {images.length === 0 && (
                <Box
                  component="img"
                  width={85}
                  sx={{ aspectRatio: 1 }}
                  src={image}
                />
              )}
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={1}>
          <Stack px={{ md: 8 }} spacing={2}>
            <Button variant="contained">Add To Cart</Button>
            <Button variant="outlined">Buy Now</Button>
            <Button variant="outlined" onClick={() => deleteProduct(id)}>Remove</Button>
          </Stack>
        </Grid>

      </Grid>
    </Container >
  )
}

export default Product