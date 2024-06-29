import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const DB_DEV = 'http://localhost:8080/api/'
const DB_PROD = 'https://dotnet-ecommerce.onrender.com/api/'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: DB_PROD }),
  endpoints: (builder) => ({

    getProducts: builder.query({
      query: () => 'products',
    }),

    getProductsById: builder.query({
      query: (id) => `products/${id}`
    }),

    editProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body
      })
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: 'products',
        method: 'POST',
        body
      })
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      })
    })
  }),
})

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useEditProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation
} = api