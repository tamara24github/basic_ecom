import Table from '../components/common/Table'
import { CreateProductPayload, Product } from '../services/products'
import TextField from '../components/common/TextField'
import Button from '../components/common/Button'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { ChangeEvent, useEffect, useState } from 'react'
import Modal from '../components/common/Modal'
import Paragraph from '../components/common/Paragraph'
import ProductForm from '../components/ProductForm'
import { TableConfig } from '../components/common/Table'
import useDeleteProduct from '../hooks/useDeleteProduct'
import useGetProducts from '../hooks/useGetProducts'
import useCreateProduct from '../hooks/useCreateProduct'

function Admin() {
  const [showModal, setShowModal] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [filterdProductsData, setFilterdProductsData] = useState<Product[]>([])
  const useDeleteHook = useDeleteProduct()
  const useGetHook = useGetProducts()
  const useCreateHook = useCreateProduct()

  useEffect(() => {
    useGetHook.fetchGetProducts({
      onSuccess: (data) => setFilterdProductsData(data),
    })
  }, [])

  useEffect(() => {
    setFilterdProductsData(
      useGetHook.data.filter((product) =>
        product.name.toLowerCase().includes(searchItem.toLowerCase()),
      ),
    )
  }, [searchItem])

  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSearchItem = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value)
  }

  const handleCreateProduct = (formValues: CreateProductPayload) => {
    useCreateHook.fetchCreateProduct({
      payload: formValues,
      onSuccess: (data) => {
        setFilterdProductsData((previousState) => [...previousState, data])
      },
    })
  }

  const config: TableConfig = [
    { label: 'Product Name', field: 'name' },
    { label: 'Category', field: 'category' },
    { label: 'Color', field: 'color' },
    { label: 'Price', field: 'price' },
    { label: 'Quantity', field: 'stockQuantity' },
    {
      label: 'Actions',
      component: ({ data: dataId }) => {
        //rowId
        return (
          <button
            onClick={() =>
              useDeleteHook.fetchDeleteProduct({
                id: dataId,
                onSuccess: () => {
                  const newValue = useGetHook.data?.filter(
                    (product) => product.id !== dataId,
                  )
                  useGetHook.update((previousState) => ({
                    ...previousState,
                    data: newValue,
                  }))
                  setFilterdProductsData(newValue)
                },
                onError: (error) => {
                  console.log(error)
                },
              })
            }
          >
            delete
          </button>
        )
      },
    },
  ]

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
          <ProductForm
            onCloseModal={handleCloseModal}
            onSubmit={handleCreateProduct}
            error={useCreateHook.error}
            isLoading={useCreateHook.isLoading}
            data={useCreateHook.data}
          />
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
          data={filterdProductsData || []}
          isLoading={useGetHook.isLoading}
          error={{ message: useGetHook.error } as Error}
          config={config}
        />
      </div>
    </>
  )
}

export default Admin
