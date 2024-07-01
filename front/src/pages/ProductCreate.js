import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Container, Stack, Typography } from "@mui/material"

import { useCreateProductMutation } from "../state/api"

import ProductForm from "../components/products/ProductFrom"

const ProductCreate = () => {
  const navigate = useNavigate()
  const [createProduct, { isLoading, data, error }] = useCreateProductMutation()

  const handleSubmit = (formData) => {
    createProduct(formData)
  }

  useEffect(() => {
    if (!isLoading && undefined !== data)
      navigate('/')
  }, [isLoading])

  return (
    <Container maxWidth="xl">
      <Stack direction={{ md: 'row' }} py={6}>
        <Box width="100%">
          <Box mr={3}>
            <Typography variant="h4" mb={2} fontWeight="bold">Add new product</Typography>
            <Box maxWidth={580} display={{ xs: 'none', md: 'block' }}>
              <Typography>Once you submit the form, your product will be available on our e-commerce platform. We recommend reviewing our policies to ensure compliance and maintain a positive experience for all users. Thank you for using our platform!</Typography>
            </Box>
          </Box>
        </Box>
        <Box width="100%">
          <ProductForm onSubmit={handleSubmit} disable={isLoading} requestErrors={error?.data?.errors} />
        </Box>
      </Stack>
    </Container>
  )
}

export default ProductCreate