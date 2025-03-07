import React, { SyntheticEvent } from 'react'

type Props = {
    OnPortfolioCreate:(e:SyntheticEvent)=>void
    symbol:string
}

const AddPortfolio = ({OnPortfolioCreate,symbol}: Props) => {
  return (

    <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
      <form onSubmit={OnPortfolioCreate}>
        <input readOnly={true} hidden={true} value={symbol} />
        <button
          type="submit"
          className="p-2 px-8 text-white bg-darkBlue rounded-lg hover:opacity-70 focus:outline-none"
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default AddPortfolio