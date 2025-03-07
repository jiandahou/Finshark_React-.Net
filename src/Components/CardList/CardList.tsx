import React, { SyntheticEvent } from 'react'
import Card from '../Card/Card'
import { CompanySearch } from '../../company'
import {v4 as uuidv4} from "uuid"

type Props = {
    searchResult:Array<CompanySearch>
    OnPortfolioCreate:(e:SyntheticEvent)=>void,
}

const CardList = ({searchResult,OnPortfolioCreate}: Props) => {
  return (
    <div>
        {searchResult.length>0?(
                    searchResult.map((result)=>{
                        return <Card key={uuidv4()} id={result.symbol} searchResult={result} OnPortfolioCreate={OnPortfolioCreate}/>
                    })
        ):(
            <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
            No results!
          </p>
        )}
    </div>
  )
}

export default CardList