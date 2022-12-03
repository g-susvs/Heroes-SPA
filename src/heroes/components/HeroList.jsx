import { useMemo } from "react";
import { getHerosByPublisher } from "../helpers/getHerosByPublisher"
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {

    const herosArr = useMemo(() => getHerosByPublisher(publisher), [publisher])
    return (
        <div className="hero-list">
            {
                herosArr.map((hero) => {
                    return (
                        <HeroCard key={hero.id} {...hero} />
                    )
                })
            }
        </div>
    )
}
