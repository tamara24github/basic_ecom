import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Product,
  categories,
  colors,
  createProduct,
  features,
} from '../services/products'
import Button from './common/Button'
import Checkbox from './common/Checkbox'
import NumberInput from './common/NumberInput'
import RadioGroup from './common/RadioGroup'
import Select from './common/Select'
import TextArea from './common/TextArea'
import TextField from './common/TextField'

const categoryOptions = categories.map((category) => {
  return { label: category, value: category }
})

const featureOptions = features.map((feature) => ({
  label: feature,
  value: feature,
}))

const colorOptions = colors.map((color) => ({ label: color, value: color }))

const defaultValues = {
  name: '',
  description: '',
  image: '',
  price: 0,
  stockQuantity: 0,
  category: '',
  color: '',
  features: '',
  isAvailable: false,
}

type Inputs = typeof defaultValues

type Props = {
  onCloseModal?: () => void
}

function AddProductForm({ onCloseModal }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues,
  })

  const queryClient = useQueryClient()
  const { data, error, isPending, isSuccess, mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.setQueriesData(
        {
          queryKey: ['products'],
        },
        (currentValue?: Product[]) => {
          return currentValue ? [...currentValue, data] : [data]
        },
      )
      reset()
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const values = {
      ...data,
      features: [data.features],
    }
    mutate(values)
    console.log(data)
  }

  console.log(watch())

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <TextField
        className="mb-6"
        required
        label="Name"
        placeholder="Product Name"
        {...register('name', { required: 'This field is required' })}
      />
      {/* TODO: Handle error rendering inside ui components */}
      {errors.name && (
        <span className="text-red-500">{errors.name.message}</span>
      )}

      <div className="flex flex-col md:flex-row justify-between mb-6">
        <RadioGroup
          required
          className="md:w-[35%] w-full"
          label="Category"
          options={categoryOptions}
          {...register('category')}
        />

        <TextArea
          className="md:w-[62%] w-full"
          label="Product Description"
          rows={6}
          placeholder="Product description"
          {...register('description')}
        />
      </div>

      <TextField
        className="mb-6"
        required
        label="Image"
        placeholder="Image URL"
        {...register('image', { required: 'This field is required' })}
      />

      <div className="flex flex-col md:flex-row mb-6 justify-between w-full">
        <Select
          className="md:w-[42%] w-full"
          required
          label="Color"
          options={colorOptions}
          {...register('color', { required: 'This field is required' })}
        />
        <Select
          className="md:w-[42%] w-full"
          label="Features"
          options={featureOptions}
          {...register('features')}
        />
      </div>

      <div className="flex flex-col md:flex-row mb-6 justify-between w-full">
        <NumberInput
          className="md:w-[42%] w-full"
          required
          placeholder="0"
          withIcon
          label="Product Price"
          {...register('price', { required: 'This field is required' })}
        />

        <NumberInput
          className="md:w-[42%] w-full"
          required
          placeholder="0"
          label="Stock Quantity"
          {...register('stockQuantity', { required: 'This field is required' })}
        />
      </div>
      <div>
        <Checkbox label="Is Available" {...register('isAvailable')} />
      </div>

      {error && (
        <p className="text-red-500 text-center text-lg">
          Something went wrong, please try again
        </p>
      )}

      {isSuccess && (
        <p className="text-green-500 text-center text-lg">
          Product "{data.name}" successfully added
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

export default AddProductForm
