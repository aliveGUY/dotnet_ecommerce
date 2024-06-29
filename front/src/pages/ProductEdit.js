import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Typography } from "@mui/material"

import { useGetProductsByIdQuery, useEditProductMutation } from "../state/api"

import ProductForm from "../components/ProductFrom"

const ProductEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetProductsByIdQuery(id)
  const [editProduct, { isLoading: editLoading, data: response }] = useEditProductMutation()

  const handleSubmit = (formData) => {
    editProduct({ id, body: formData })
  }

  useEffect(() => {
    if (!editLoading && undefined !== response)
      navigate('/')
  }, [editLoading])

  if (isLoading) return 'Loading...'
  if (error) return 'Error'

  return (
    <Box>
      <Typography>Edit Product</Typography>
      <ProductForm defaultProduct={data} onSubmit={handleSubmit} disable={editLoading} />
    </Box>
  )
}

export default ProductEdit