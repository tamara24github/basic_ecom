import { useQuery } from '@tanstack/react-query'
import Table from '../components/common/Table'
import { getAllProducts } from '../services/products'
import TextField from '../components/common/TextField'
import Button from '../components/common/Button'

function Admin() {
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  })

  const { error, isLoading, data } = productsQuery

  return (
    <div className="flex flex-col items-center">
      <div className="flex my-14">
        <TextField className="" />
        <Button
          backgroundColor="blueLight"
          hover="blueDark"
          rounded="xl2"
          fontWeight="bold"
          className="ml-6 px-6 py-2 text-lg"
        >
          + Add
        </Button>
      </div>
      <div>
        <Table data={data || []} isLoading={isLoading} error={error}></Table>
      </div>
    </div>
  )
}

export default Admin
