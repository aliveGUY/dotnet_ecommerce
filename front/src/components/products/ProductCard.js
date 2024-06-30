import { Box, Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"
import image from '../../static/images/default-image.jpg'
import { useNavigate } from "react-router-dom"

const ProductCard = ({ product }) => {
  const { title = 'Sample Text', description = 'N/A', price = 0, id = 0 } = product || {}

  const navigate = useNavigate()

  const addToCart = (e) => {
    e.stopPropagation()
  }

  const clickOnCard = () => {
    navigate(`/product/${id}`)
  }

  return (
    <Card
      onClick={clickOnCard}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)'
        }
      }}
    >
      <Box
        component="img"
        height={{ sm: 402, lg: 486 }}
        width={{ sm: 335, lg: 405 }}
        src={image}
      />
      <CardContent>
        <Stack direction="row" alignItems="center">
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight={700}>{title}</Typography>
            <Typography>{description}</Typography>
          </Box>
          <Typography>${price}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="outlined" onClick={addToCart}>Add to cart</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard