import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Stack, Typography } from "@mui/material"

import { useCreateProductMutation } from "../state/api"

import ProductForm from "../components/ProductFrom"

const ProductCreate = () => {
  const navigate = useNavigate()
  const [createProduct, { isLoading, data }] = useCreateProductMutation()

  const handleSubmit = (formData) => {
    createProduct(formData)
  }

  useEffect(() => {
    if (!isLoading && undefined !== data)
      navigate('/')
  }, [isLoading])

  return (
    <Stack>
      <Typography>Add new product</Typography>
      <ProductForm onSubmit={handleSubmit} disable={isLoading} />
    </Stack>
  )
}

export default ProductCreate