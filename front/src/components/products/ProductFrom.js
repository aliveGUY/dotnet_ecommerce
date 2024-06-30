import { Box, Button, Stack, Table, TableCell, TableRow, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import defaultImage from '../../static/images/default-image.jpg'
import CloseIcon from '@mui/icons-material/Close'

const ProductForm = ({ defaultProduct, onSubmit }) => {
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

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Stack gap={3}>
        <TextField {...register('title')} label="Title" defaultValue={title} />
        <TextField {...register('description')} label="Description" defaultValue={description} />

        <Stack>
          <Stack direction="row" spacing={2} pl={2} alignItems="center">
            <Typography color="gray">Characteristics</Typography>
            <Button variant="outlined" onClick={onAddCharacteristic}>ADD +</Button>
          </Stack>
          <Table>
            {_characteristic.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField value={item} onChange={(e) => onEditCharacteristicKey(item, e.target.value)} />
                  {errors.characteristic && <Typography>{errors.characteristic[item]?.message}</Typography>}
                </TableCell>
                <TableCell>
                  <TextField {...register(`characteristic.${item}`)} defaultValue={characteristic[item] || ''} />
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => onRemoveCharacteristic(item)}>Remove -</Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Stack>

        <TextField {...register('policies')} label="Policies" defaultValue={policies} />
        <TextField {...register('price')} label="Price" defaultValue={price} />

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