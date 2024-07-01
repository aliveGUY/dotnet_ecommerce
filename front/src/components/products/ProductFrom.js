import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import defaultImage from '../../static/images/default-image.jpg'
import CloseIcon from '@mui/icons-material/Close'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const ProductForm = ({ defaultProduct, onSubmit, requestErrors }) => {
  const { title = '', description = '', policies = '', price = '', characteristic = {} } = defaultProduct || {}
  const [_characteristic, setCharacteristic] = useState(Object.keys(characteristic))
  const [images, setImages] = useState([])

  const {
    register,
    unregister,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const _onSubmit = async (data) => {
    try {
      let imageBase64Array = await Promise.all(
        images.map((image) => readFileAsBase64(image))
      )

      imageBase64Array = imageBase64Array.map(code => `data:image/png;base64,${code}`)

      onSubmit && onSubmit({ ...data, images: imageBase64Array });
    } catch (error) {
      console.error('Error reading images:', error);
    }
  };

  const readFileAsBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onAddCharacteristic = () => {
    setCharacteristic([..._characteristic, 'item_' + (_characteristic.length + 1)])
  }

  const onEditCharacteristicKey = (key, newKey) => {
    if (_characteristic.includes(newKey)) {
      setError(`characteristic.${key}`, { message: 'Characteristics should be unique' })
      return
    }

    setCharacteristic(prev => prev.map(item => {
      if (key === item) {
        unregister(`characteristic.${key}`)
        return newKey
      }
      return item
    }))
  }

  const onRemoveCharacteristic = (key) => {
    setCharacteristic(prev => prev.filter(item => item !== key))
    unregister(`characteristic.${key}`)
  }

  const onImageUpload = (e) => {
    const image = e.target.files
    setImages([...images, ...image])
  }

  const removeImage = (image) => {
    setImages(prev => prev.filter(_image => image !== _image))
  }

  useEffect(() => {
    if (requestErrors) {
      Object.entries(requestErrors).map(([key, [value]]) => {
        setError(key, { message: value })
      })
    }
  }, [requestErrors])

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Stack gap={3}>
        <Stack>
          <TextField {...register('title', { required: 'Title are required' })} label="Title" defaultValue={title} />
          {errors.title && <Typography>{errors.title.message}</Typography>}
        </Stack>
        <Stack>
          <TextField {...register('description', { required: 'Description are required' })} label="Description" defaultValue={description} />
          {errors.description && <Typography>{errors.description.message}</Typography>}
        </Stack>

        <Stack>
          <Stack direction="row" spacing={2} pl={2} alignItems="center">
            <Typography color="gray">Characteristics</Typography>
            <Button variant="outlined" onClick={onAddCharacteristic}>ADD +</Button>
          </Stack>
          <Stack py={_characteristic.length > 0 && 1} spacing={1}>
            {_characteristic.map((item, index) => (
              <Stack direction="row" alignItems="center" key={index}>
                <Box width="100%">
                  <TextField value={item} onChange={(e) => onEditCharacteristicKey(item, e.target.value)} />
                  {errors.characteristic && <Typography>{errors.characteristic[item]?.message}</Typography>}
                </Box>
                <ChevronRightIcon />
                <Box width="100%">
                  <TextField {...register(`characteristic.${item}`)} defaultValue={characteristic[item] || ''} />
                </Box>
                <Box width="100%" ml={3}>
                  <Button variant="outlined" onClick={() => onRemoveCharacteristic(item)}>Remove</Button>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Stack>
          <TextField {...register('policies', { required: 'Policies are required' })} label="Policies" defaultValue={policies} />
          {errors.policies && <Typography>{errors.policies.message}</Typography>}
        </Stack>
        <Stack>
          <TextField {...register('price', { required: 'Price are required' })} label="Price" defaultValue={price} />
          {errors.price && <Typography>{errors.price.message}</Typography>}
        </Stack>

        <Box>
          <Stack direction="row" spacing={2} pl={2} alignItems="center">
            <Typography color="gray">Images</Typography>
            <Button variant="outlined" component="label" >
              Upload +
              <input type="file" hidden multiple onChange={onImageUpload} accept="image/*" />
            </Button>
          </Stack>

          <Stack direction="row" sx={{ overflowX: 'auto' }} spacing={2} py={2}>
            {images.map((image, key) => (
              <Box
                onClick={() => removeImage(image)}
                sx={{
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <Box
                  key={key}
                  component="img"
                  height={150}
                  width={150}
                  src={URL.createObjectURL(image)}
                />
                <Box sx={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  borderRadius: 99,
                  backgroundColor: 'red',
                  width: 25,
                  height: 25
                }}>
                  <CloseIcon htmlColor="white" />
                </Box>
              </Box>
            ))}
            {images.length === 0 && (
              <Box
                component="img"
                height={150}
                width={150}
                src={defaultImage}
              />
            )}
          </Stack>
        </Box>

        <Box>
          <Button type="submit" variant="contained">Submit</Button>
        </Box>
      </Stack>
    </form>
  )
}

export default ProductForm