import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Table from '../components/common/Table'
import {
  Product,
  deleteProduct,
  getAllProducts,
  updateAvailability,
} from '../services/products'
import TextField from '../components/common/TextField'
import Button from '../components/common/Button'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import Modal from '../components/common/Modal'
import Paragraph from '../components/common/Paragraph'
import AddProductForm from '../components/AddProductForm'
import { TableConfig } from '../components/common/Table'
import EditProductForm from '../components/EditProductForm'
import Popper from '../components/Popper'
import { TiThMenu } from 'react-icons/ti'
import Checkbox from '../components/common/Checkbox'
import { ToastContext } from '../contexts/ToastContext'

function Admin() {
  const [showModal, setShowModal] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)
  const [showOptions, setShowOptions] = useState(false)

  const { toast } = useContext(ToastContext)

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
      label: 'Available',
      component: ({ data }) => {
        return (
          <Checkbox
            className="justify-center"
            defaultChecked={data.availability}
            onChange={(e) =>
              updateAvailabilityQuery.mutate({
                payload: e.currentTarget.checked,
                id: data.id,
              })
            }
          />
        )
      },
    },
    {
      label: 'Actions',
      component: ({ data }) => {
        const actions = [
          {
            text: 'delete',
            onClick: () => deleteProductMutation.mutate(data.id),
          },
          {
            text: 'edit',
            onClick: () => {
              setShowEditModal(true)
              setProductToEdit(data)
            },
          },
        ]
        return (
          <>
            <Popper
              anchorElement={
                <Button
                  onClick={() => setShowOptions(!showOptions)}
                  className="text-blue-950"
                >
                  <TiThMenu className="text-lg" />
                </Button>
              }
            >
              <div className=" flex flex-col w-[100px] p-1 items-strech justify-stretch bg-blue-950 rounded-xl">
                {actions.map((action, i) => {
                  return (
                    <Button
                      key={i}
                      onClick={action.onClick}
                      className="text-white my-[1px] px-[1px]"
                      backgroundColor="blueDark"
                      hover="blueLight"
                    >
                      {action.text}
                    </Button>
                  )
                })}
              </div>
            </Popper>
          </>
        )
      },
    },
  ]

  const updateAvailabilityQuery = useMutation({
    mutationFn: updateAvailability,
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
      toast({
        message: `Successfully edited a product.`,
        type: 'success',
      })
    },
    onError: () => {
      toast({
        message: `Failed to edit a product`,
        type: 'error',
      })
    },
  })

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

  const queryClient = useQueryClient()

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (_, productId) => {
      queryClient.setQueriesData(
        {
          queryKey: ['products'],
        },
        (currentValue?: Product[]) => {
          const newValue = currentValue?.filter((v) => v.id !== productId)
          return newValue
        },
      )

      toast({
        message: `Successfully deleted product.`,
        type: 'success',
      })
    },
    onError: () => {
      toast({ message: `Failed to delete product`, type: 'error' })
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

  const handleCloseEditModal = () => {
    setShowEditModal(false)
  }

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
          <AddProductForm onCloseModal={handleCloseModal} />
        </Modal>
      )}
      {productToEdit && showEditModal && (
        <Modal closeModal={handleCloseEditModal} className="items-center">
          <Paragraph
            weight="semibold"
            color="blueDark"
            className="text-center mb-4 text-2xl font-bold"
          >
            Edit Product
          </Paragraph>
          <EditProductForm
            productToEdit={productToEdit}
            onCloseModal={handleCloseEditModal}
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
          data={data || []}
          isLoading={isLoading}
          error={error}
          config={config}
        />
      </div>
    </>
  )
}

export default Admin
