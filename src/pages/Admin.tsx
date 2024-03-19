import { useQuery } from '@tanstack/react-query'
import Table from '../components/common/Table'
import { Product, getAllProducts } from '../services/products'
import TextField from '../components/common/TextField'
import Button from '../components/common/Button'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { ChangeEvent, useCallback, useState } from 'react'
import Modal from '../components/common/Modal'
import Paragraph from '../components/common/Paragraph'

function Admin() {
  const [showModal, setShowModal] = useState(false)
  const [searchItem, setSearchItem] = useState('')

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

  const actionBar = (
    <>
      <Button
        backgroundColor="blueDark"
        hover="blueLight"
        fontWeight="bold"
        className="mr-10 p-2 w-28 text-lg "
      >
        Add
      </Button>
      <Button
        fontWeight="bold"
        backgroundColor="transparent"
        textColor="red"
        hover="red"
        onClick={handleCloseModal}
        className="p-2 w-28 text-lg border  border-red-600"
      >
        Close
      </Button>
    </>
  )

  return (
    <>
      {showModal && (
        <Modal closeModal={handleCloseModal} actionBar={actionBar}>
          <Paragraph
            weight="semibold"
            color="blueDark"
            className="mx-auto text-xl"
          >
            Add Product
          </Paragraph>
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
            placeholder="Search Product"
            className="md:w-[500px]"
            onChange={handleSearchItem}
            value={searchItem}
          />
        </div>

        <Table data={data || []} isLoading={isLoading} error={error}></Table>
      </div>
    </>
  )
}

export default Admin
