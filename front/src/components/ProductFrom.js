import { Button, Stack, Table, TableCell, TableRow, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ProductForm = ({ defaultProduct, onSubmit, disable }) => {
  const { title = '', description = '', price = '', characteristic = {} } = defaultProduct || {}
  const [_characteristic, setCharacteristic] = useState(Object.keys(characteristic))

  const {
    register,
    unregister,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const _onSubmit = (data) => onSubmit && onSubmit(data)

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

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Stack gap={3}>
        <TextField {...register('title')} label="Title" defaultValue={title} />
        <TextField {...register('description')} label="Description" defaultValue={description} />
        <TextField {...register('price')} label="Price" defaultValue={price} />

        <Stack>
          <Stack direction="row" alignItems="center">
            <Typography>Characteristic</Typography>
            <Button onClick={onAddCharacteristic}>ADD +</Button>
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
                  <Button onClick={() => onRemoveCharacteristic(item)}>Remove -</Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Stack>
        <Button type="submit" disable={disable}>Submit</Button>
      </Stack>
    </form>
  )
}

export default ProductForm