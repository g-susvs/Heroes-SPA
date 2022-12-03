import { heroes } from "../data/heroes"

export const getHeroByName = (name = '') => {
    if( name.trim().length <=1 ) return []

    return heroes.filter(
        hereo => hereo.superhero.toLocaleLowerCase().includes(name)
    )
}
