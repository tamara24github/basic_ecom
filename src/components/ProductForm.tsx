import { useState } from 'react'
import TextField from './common/TextField'
import { categories, colors, features } from '../services/products'
import NumberInput from './common/NumberInput'
import TextArea from './common/TextArea'
import RadioGroup from './common/RadioGroup'
import Checkbox from './common/Checkbox'
import Select from './common/Select'
import Button from './common/Button'

const categoryOptions = categories.map((category) => {
  return { label: category, value: category }
})

const featureOptions = features.map((feature) => ({
  label: feature,
  value: feature,
}))

const colorOptions = colors.map((color) => ({ label: color, value: color }))

type Props = {
  onCloseModal?: () => void
}

function ProductForm({ onCloseModal }: Props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setProduct] = useState('')
  const [stockQuantity, setStockQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [feature, setFeature] = useState('')
  const [isAvailable, setIsAvailable] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const values = {
      name,
      description,
      image,
      price,
      stockQuantity,
      category,
      color,
      feature,
      isAvailable,
    }
    console.log(values)
  }

  const handleProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleProductDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value)
  }

  const handleProductImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value)
  }

  const handleProductPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(e.target.value)
  }
  const handleStockQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockQuantity(e.target.value)
  }

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  const handleColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value)
  }

  const handleFeature = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFeature(e.target.value)
  }

  const handleCheckbox = () => {
    setIsAvailable(!isAvailable)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <TextField
        className="mb-6"
        label="Name"
        value={name}
        onChange={handleProductName}
        placeholder="Product Name"
        required
      />

      <div className="flex flex-col md:flex-row justify-between mb-6">
        <RadioGroup
          required
          className="md:w-[35%] w-full"
          label="Category"
          options={categoryOptions}
          value={category}
          name="flexRadioDefault"
          onChange={handleCategory}
        />

        <TextArea
          className="md:w-[62%] w-full"
          label="Product Description"
          rows={6}
          onChange={handleProductDescription}
          value={description}
          placeholder="Product description"
        />
      </div>

      <TextField
        label="Image"
        required
        value={image}
        onChange={handleProductImage}
        placeholder="Image URL"
        className="mb-6"
      />

      <div className="flex flex-col md:flex-row mb-6 justify-between w-full">
        <Select
          required
          className="md:w-[42%] w-full"
          value={color}
          label="Color"
          onChange={handleColor}
          options={colorOptions}
        />
        <Select
          className="md:w-[42%] w-full"
          value={feature}
          label="Features"
          onChange={handleFeature}
          options={featureOptions}
        />
      </div>

      <div className="flex flex-col md:flex-row mb-6 justify-between w-full">
        <NumberInput
          placeholder="0"
          required
          className="md:w-[42%] w-full"
          withIcon
          value={price}
          onChange={handleProductPrice}
          label="Product Price"
        />

        <NumberInput
          placeholder="0"
          required
          className="md:w-[42%] w-full"
          value={stockQuantity}
          onChange={handleStockQuantity}
          label="Stock Quantity"
        />
      </div>
      <div>
        <Checkbox
          value={isAvailable}
          onClick={handleCheckbox}
          label="Is Available"
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          backgroundColor="blueDark"
          hover="blueLight"
          fontWeight="bold"
          className="mr-10 p-2 w-28 text-lg "
          type="submit"
        >
          Add
        </Button>
        <Button
          fontWeight="bold"
          backgroundColor="transparent"
          textColor="red"
          hover="red"
          onClick={onCloseModal}
          className="p-2 w-28 text-lg border border-red-600 opacity-[0.9]"
        >
          Close
        </Button>
      </div>
    </form>
  )
}

export default ProductForm
