import { Product } from '../../services/products'

type TableProps = {
  data: Product[]
  isLoading: boolean
  error: Error | null
}

function Table({ data, isLoading, error }: TableProps) {
  const config: { label: string; field: keyof Product; style?: string }[] = [
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
    <table className="w-[95%] text-center border-x border-teal-200 mb-4">
      <thead>
        <tr>
          {config.map((tableHeader) => {
            return (
              <td
                className="py-3 px-9 bg-blue-950 text-white font-bold text-lg border-2  border-teal-100 rounded-b-[11px] drop-shadow-md "
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
        {data.map((row, index) => {
          return (
            <tr
              key={row.id}
              className={
                index % 2 === 0 ? 'bg-blue-50 ' : 'bg-blue-100 bg-opacity-[0.8]'
              }
            >
              {config.map((x) => {
                return (
                  <td className="font-semibold text-blue-950 px-2 py-3  border-b-2 border-teal-200 border-dashed ">
                    {row[x.field]}
                    {x.field === 'price' && ' € '}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
