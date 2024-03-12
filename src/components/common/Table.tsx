import { Product } from '../../services/products'

type TableProps = {
  data: Product[]
  isLoading: boolean
  error: Error | null
}

function Table({ data, isLoading, error }: TableProps) {
  const config: { label: string; field: keyof Product }[] = [
    {
      label: 'Product Name',
      field: 'name',
    },
    { label: 'Category', field: 'category' },
    { label: 'Color', field: 'color' },
    { label: 'Price', field: 'price' },
    { label: 'Quantity', field: 'stockQuantity' },
  ]
  return (
    <table className="w-[95%] text-center">
      <thead>
        <tr>
          {config.map((tableHeader) => {
            return (
              <td
                className="py-2 px-9 border-2 border-white bg-blue-950 text-white font-bold text-lg"
                key={tableHeader.label}
              >
                {tableHeader.label}
              </td>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {!data.length && (
          <tr>
            <td className="text-center" colSpan={5}>
              There is no such item
            </td>
          </tr>
        )}
        {isLoading && (
          <tr>
            <td className="text-center" colSpan={5}>
              Loading...
            </td>
          </tr>
        )}
        {error && (
          <tr>
            <td className="text-center" colSpan={5}>
              {error?.message}
            </td>
          </tr>
        )}
        {data.map((row) => {
          return (
            <tr key={row.id}>
              {config.map((x) => {
                return <td>{row[x.field]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
