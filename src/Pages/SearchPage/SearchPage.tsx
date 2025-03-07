import React, { SyntheticEvent, useEffect, useState } from 'react'
import { CompanySearch } from '../../company'
import { searchCompanies } from '../../api'
import Navbar from '../../Components/Navbar/Navbar'
import Search from '../../Components/Search/Search'
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio'
import CardList from '../../Components/CardList/CardList'
import { PortfolioGet } from '../../Models/Portfolio'
import { toast } from 'react-toastify'
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService'

type Props = {}

const SearchPage = (props: Props) => {
    const [search,setSearch]=useState("")
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
      []
    );    const [searchResult,setSearchResult]=useState<Array<CompanySearch>>([])
    const [serverError,setServerError]=useState<string>("")
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
        console.log(e)
    }
    useEffect(() => {
      getPortfolio();
    }, []);
    const OnPortfolioCreate=(e:any)=>{
      portfolioAddAPI(e.target[0].value)
      .then((res) => {
        if (res?.status === 204) {
          toast.success("Stock added to portfolio!");
          getPortfolio();
        }
      })
      .catch((e) => {
        toast.warning("Could not add stock to portfolio!");
      });
    }
    const getPortfolio = () => {
      portfolioGetAPI()
        .then((res) => {
          if (res?.data) {
            setPortfolioValues(res?.data);
          }
        })
        .catch((e) => {
          setPortfolioValues(null);
        });
    };
    const onSearchSubmit=async (e:SyntheticEvent)=>{
      e.preventDefault()
        const result=await searchCompanies(search)
        if(typeof result=== "string"){
          setServerError(result)
        }
        else if(Array.isArray(result.data)){
          setSearchResult(result.data)
        }
        console.log(searchResult)
    }
    const onPortfolioDelete = (e: any) => {
      e.preventDefault();
      portfolioDeleteAPI(e.target[0].value).then((res) => {
        if (res?.status == 200) {
          toast.success("Stock deleted from portfolio!");
          getPortfolio();
        }
      });
    };
  return (
    <div >
    <Search handleChange={handleChange} search={search} onSearchSubmit={onSearchSubmit}/>
    <ListPortfolio portfolioValues={portfolioValues!} onPortfolioDelete={onPortfolioDelete}/>
    {serverError&&<h1>{serverError}</h1>}
    <CardList searchResult={searchResult} OnPortfolioCreate={OnPortfolioCreate}/>
  </div>
  )
}

export default SearchPage

function getPortfolio() {
  throw new Error('Function not implemented.')
}
