import TextField from '../common/TextField'
import {
  CreateProductPayload,
  Product,
  categories,
  colors,
  editProduct,
} from '../../services/products'
import NumberInput from '../common/NumberInput'
import TextArea from '../common/TextArea'
import RadioGroup from '../common/RadioGroup'
import Checkbox from '../common/Checkbox'
import Select from '../common/Select'
import Button from '../common/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const requiredErrorMessage = 'This field is required'
const categoryOptions = categories.map((category) => {
  return { label: category, value: category }
})
const schema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string().required(),
  price: yup.number().required().min(0.01),
  stockQuantity: yup.number().required().min(1),
  category: yup.string().required(),
  color: yup.string().required(),
  availability: yup.boolean().required(),
})

type FormValues = CreateProductPayload

const colorOptions = colors.map((color) => ({ label: color, value: color }))

type Props = {
  onCloseModal?: () => void
  productToEdit: Product
}
function EditProductForm({ onCloseModal, productToEdit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: productToEdit,
    resolver: yupResolver(schema),
  })

  const queryClient = useQueryClient()
  const { data, error, isPending, isSuccess, mutate } = useMutation({
    mutationFn: editProduct(productToEdit.id),
    onSuccess: (data) => {
      queryClient.setQueriesData(
        {
          queryKey: ['products'],
        },
        (currentValue?: Product[]) => {
          return currentValue?.map((item) => {
            return data.id === item.id ? data : item
          })
        },
      )
    },
  })
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <TextField
        className="mb-6"
        required
        label="Name"
        placeholder="Product Name"
        {...register('name', { required: requiredErrorMessage })}
        error={errors.name?.message}
      />
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <RadioGroup
          className="md:w-[35%] w-full"
          label="Category"
          options={categoryOptions}
          required
          {...register('category')}
          error={errors.category?.message}
        />
        <TextArea
          className="md:w-[62%] w-full"
          label="Product Description"
          rows={6}
          placeholder="Product description"
          {...register('description')}
          error={errors.description?.message}
        />
      </div>
      <TextField
        className="mb-6"
        label="Image"
        placeholder="Image URL"
        required
        {...register('image', { required: requiredErrorMessage })}
        error={errors.image?.message}
      />
      <Select
        className="mb-6"
        label="Color"
        options={colorOptions}
        required
        {...register('color', { required: requiredErrorMessage })}
        error={errors.color?.message}
      />

      <div className="flex flex-col md:flex-row mb-6 justify-between w-full">
        <NumberInput
          className="md:w-[42%] w-full"
          label="Product Price"
          withIcon
          placeholder="0"
          required
          {...register('price', { required: requiredErrorMessage })}
          error={errors.price?.message}
        />
        <NumberInput
          className="md:w-[42%] w-full"
          label="Stock Quantity"
          step="1"
          placeholder="0"
          required
          {...register('stockQuantity', { required: requiredErrorMessage })}
          error={errors.stockQuantity?.message}
        />
      </div>
      <div>
        <Checkbox
          label="Is Available"
          {...register('availability')}
          error={errors.availability?.message}
        />
      </div>
      {error && (
        <p className="text-red-500 text-center text-lg">
          Something went wrong, please try again
        </p>
      )}
      {isSuccess && (
        <p className="text-green-500 text-center text-lg">
          Product "{data.name}" successfully edited
        </p>
      )}
      <div className="flex justify-center mt-4">
        <Button
          backgroundColor="blueDark"
          hover="blueLight"
          fontWeight="bold"
          className="mr-10 p-2 w-28 text-lg "
          type="submit"
          disabled={isPending}
        >
          Edit
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
export default EditProductForm
