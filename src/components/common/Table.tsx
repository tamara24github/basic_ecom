import { twMerge } from 'tailwind-merge'
import { Product } from '../../services/products'
import { FaSpinner } from 'react-icons/fa'
import Paragraph from './Paragraph'
import { MdErrorOutline } from 'react-icons/md'
import Button from './Button'
import Select from './Select'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const limitOptions = ['5', '10', '15', '20'].map((value) => ({
  label: value,
  value: value,
}))

export type TableConfig = {
  label: string
  field?: keyof Product
  component?: ({ data }: { data: Product }) => JSX.Element
}[]

type TableProps = {
  data: Product[]
  isLoading: boolean
  error: Error | null
  config: TableConfig
  page?: number
  limit?: number
  lastPage?: number
  setPage?: Dispatch<SetStateAction<number>>
  setLimit?: Dispatch<SetStateAction<number>>
}

function Table({
  data,
  isLoading,
  error,
  config,
  page,
  limit,
  lastPage,
  setPage,
  setLimit,
}: TableProps) {
  const pageOptions = Array.from({ length: lastPage || 0 }, (_, i) => {
    return `${i + 1}`
  }).map((value) => ({
    label: value,
    value: value,
  }))

  const handlePaginateFirst = () => {
    setPage?.(1)
  }
  const handlePaginatePrevious = () => {
    setPage?.((currentValue) => (currentValue > 1 ? currentValue - 1 : 1))
  }
  const handlePaginateNext = () => {
    if (!lastPage) {
      return
    }
    setPage?.((currentValue) =>
      currentValue < lastPage ? currentValue + 1 : lastPage,
    )
  }
  const handlePaginateLast = () => {
    if (!lastPage) {
      return
    }
    setPage?.(lastPage)
  }
  const handleSetPage = (e: ChangeEvent<HTMLSelectElement>) => {
    setPage?.(Number(e.target.value))
  }
  const handleSetLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    setPage?.(1)
    setLimit?.(Number(e.target.value))
  }

  return (
    <>
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
          {error && (
            <tr>
              <td className="text-center" colSpan={6}>
                <>
                  <MdErrorOutline className="animate-bounce h-12 w-12 text-red-600 mx-auto mt-20" />
                  <Paragraph
                    className="mt-4 text-xl text-red-600"
                    weight="semibold"
                  >
                    {error?.message}
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
                  index % 2 === 0
                    ? 'bg-blue-50 '
                    : 'bg-blue-100 bg-opacity-[0.8]'
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
                        : configItem.component?.({ data: row })}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="flex gap-4 justify-center items-center my-3">
        <Button
          onClick={handlePaginateFirst}
          backgroundColor="blueLight"
          hover="blueDark"
          fontWeight="bold"
          className="px-4"
        >
          {'<< first'}
        </Button>
        <Button
          onClick={handlePaginatePrevious}
          backgroundColor="blueLight"
          hover="blueDark"
          fontWeight="semibold"
          className="px-6 justify-center flex items-center"
        >
          <FaAngleLeft className="mr-1" />
          Prev
        </Button>

        <Paragraph weight="semibold" color="blueDark">
          Page {page} of {lastPage}
        </Paragraph>

        <Button
          onClick={handlePaginateNext}
          backgroundColor="blueLight"
          hover="blueDark"
          fontWeight="semibold"
          className="px-6 justify-center flex items-center"
        >
          Next
          <FaAngleRight className="ml-1" />
        </Button>
        <Button
          onClick={handlePaginateLast}
          backgroundColor="blueLight"
          hover="blueDark"
          fontWeight="bold"
          className="px-4"
        >
          {'last >>'}
        </Button>

        <div className="flex gap-3 items-center absolute right-11 ">
          <Paragraph weight="semibold" color="blueDark">
            Go to page:
          </Paragraph>
          <Select
            onChange={handleSetPage}
            options={pageOptions}
            value={String(page)}
          />

          <Paragraph weight="semibold" color="blueDark" className="ml-4">
            Show:
          </Paragraph>
          <Select
            onChange={handleSetLimit}
            options={limitOptions}
            value={String(limit)}
          />
        </div>
      </div>
    </>
  )
}

export default Table
