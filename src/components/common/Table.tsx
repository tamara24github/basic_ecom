import { twMerge } from 'tailwind-merge'
import { Product } from '../../services/products'
import { FaSpinner } from 'react-icons/fa'
import Paragraph from './Paragraph'
import { MdErrorOutline } from 'react-icons/md'

type TableConfigComponent = {
  data: string
}

export type TableConfig = {
  label: string
  field?: keyof Product
  component?: ({ data }: TableConfigComponent) => JSX.Element
}[]

type TableProps = {
  data: Product[]
  isLoading: boolean
  error: Error | null
  config: TableConfig
}

function Table({ data, isLoading, error, config }: TableProps) {
  return (
    <table className="w-[95%] text-center  mb-4">
      <thead>
        <tr>
          {config.map((tableHeader, index) => {
            return (
              <td
                className={twMerge(
                  'py-3 px-9 bg-blue-950 text-white font-bold text-lg border-2  border-teal-100 rounded-b-[11px] drop-shadow-md ',
                  [1, 2].includes(index) && 'hidden md:table-cell',
                )}
                key={tableHeader.label}
              >
                {tableHeader.label}
              </td>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {!data.length && !isLoading && !error && (
          <tr>
            <td className="text-center" colSpan={6}>
              <Paragraph className="text-xl my-4 mt-20" weight="semibold">
                There is no such item
              </Paragraph>
            </td>
          </tr>
        )}
        {isLoading && (
          <tr>
            <td className="text-center " colSpan={6}>
              <>
                <FaSpinner className="animate-spin h-9 w-9 mx-auto mt-20" />
                <Paragraph className="mt-4 text-xl" weight="semibold">
                  Loading ...
                </Paragraph>
              </>
            </td>
          </tr>
        )}
        {error?.message && (
          <tr>
            <td className="text-center" colSpan={6}>
              <>
                <MdErrorOutline className="animate-bounce h-12 w-12 text-red-600 mx-auto mt-20" />
                <Paragraph
                  className="mt-4 text-xl text-red-600"
                  weight="semibold"
                >
                  {error.message}
                </Paragraph>
              </>
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
              {config.map((configItem, index) => {
                return (
                  <td
                    className={twMerge(
                      'font-semibold text-blue-950 px-2 py-3  border-b-2 border-teal-200 border-dashed ',
                      [1, 2].includes(index) && 'hidden md:table-cell',
                    )}
                    key={configItem.label}
                  >
                    {configItem.field
                      ? `${row[configItem.field]} ${
                          configItem.field === 'price' ? ' € ' : ''
                        }`
                      : configItem.component?.({ data: row.id })}
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
