import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Table from '../components/common/Table'
import { Product, deleteProduct, getAllProducts } from '../services/products'
import TextField from '../components/common/TextField'
import Button from '../components/common/Button'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { ChangeEvent, useCallback, useState } from 'react'
import Modal from '../components/common/Modal'
import Paragraph from '../components/common/Paragraph'
import ProductForm from '../components/ProductForm'
import { TableConfig } from '../components/common/Table'

function Admin() {
  const [showModal, setShowModal] = useState(false)
  const [searchItem, setSearchItem] = useState('')

  const config: TableConfig = [
    {
      label: 'Product Name',
      field: 'name',
    },
    { label: 'Category', field: 'category' },
    { label: 'Color', field: 'color' },
    { label: 'Price', field: 'price' },
    { label: 'Quantity', field: 'stockQuantity' },
    {
      label: 'Actions',
      component: ({ data }) => {
        return (
          <button onClick={() => deleteProductMutation.mutate(data)}>
            delete
          </button>
        )
      },
    },
  ]

  const queryClient = useQueryClient()

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data, productId) => {
      queryClient.setQueriesData(
        {
          queryKey: ['products'],
        },
        (currentValue?: Product[]) => {
          // json-server returns an empty obj in response on successfull deletion
          const newValue = currentValue?.filter((v) => v.id !== productId)
          return newValue
        },
      )
      console.log(`Successfully deleted ${data.name}`, {
        type: 'success',
      })
    },
    onError: () => {
      console.log(`Failed to delete product`, {
        type: 'error',
      })
    },
  })

  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSearchItem = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value)
  }

  const productsFilter = useCallback(
    (products: Product[]) =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchItem.toLowerCase()),
      ),
    [searchItem],
  )

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
    select: productsFilter,
  })

  const { error, isLoading, data } = productsQuery

  return (
    <>
      {showModal && (
        <Modal closeModal={handleCloseModal} className="items-center">
          <Paragraph
            weight="semibold"
            color="blueDark"
            className="text-center mb-4 text-2xl font-bold"
          >
            Add Product
          </Paragraph>
          <ProductForm onCloseModal={handleCloseModal} />
        </Modal>
      )}
      <div className="flex flex-col items-center">
        <div className="flex my-12">
          <Button
            backgroundColor="blueLight"
            hover="blueDark"
            rounded="xl2"
            fontWeight="bold"
            className="mr-16  px-6 py-2 text-lg flex items-center"
            onClick={handleOpenModal}
          >
            <IoMdAddCircleOutline className="mr-2 w-[24px] h-[24px]" />
            Add Product
          </Button>

          <TextField
            withIcon
            placeholder="Search Product"
            className="md:w-[500px]"
            onChange={handleSearchItem}
            value={searchItem}
          />
        </div>

        <Table
          data={data || []}
          isLoading={isLoading}
          error={error}
          config={config}
        ></Table>
      </div>
    </>
  )
}

export default Admin
