import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components"
import { getHeroByName } from "../helpers"

export const SearchPage = () => {

  const navigate = useNavigate() // obtener la navegiación
  const location = useLocation() // obtener información de la ubicación
  
  const searchParams = new URLSearchParams(location.search)
  const { q = '' } = Object.fromEntries(searchParams)
  const heroes = getHeroByName(q)

  const {searchText, onInputChange} = useForm({
    searchText:q
  })

  const onFormSumbit = (event) =>{
    event.preventDefault()
    navigate(`?q=${searchText}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
      <div className="col-5">
        <h4>Searching</h4>
        <hr />
        <form aria-label="form" onSubmit={onFormSumbit} >
          <input
            type="text"
            placeholder="Search a hero"
            className="form-control"
            name="searchText"
            autoComplete="off"
            value={searchText}
            onChange={onInputChange}
          />
          <button className="btn btn-outline-primary mt-3">
            Search
          </button>
        </form>
      </div>

      <div className="col-7">
        <h4>Results</h4>
        <hr />
        {
          ( q == '')
            ?<div className="alert alert-primary">Search a hero</div>
            :(heroes.length == 0) 
              && <div aria-label="no-hero"  className="alert alert-danger"> No hero with <b>{q}</b></div>


        }
        
        
        {
          heroes.map( heroe => <HeroCard key={heroe.id} {...heroe}/>)
        }        
      </div>

      </div>
    </>
  )
}
