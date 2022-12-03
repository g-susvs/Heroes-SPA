import { Link } from "react-router-dom"


const CharactersByID = ({ alter_ego, characters }) => {
    return (alter_ego == characters)
        ? <></>
        : <p>{characters}</p>
}

export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
}) => {

    const heroImageUrl = `/assets/heroes/${id}.jpg`

    return (

        <Link to={`/hero/${id}`} className="my-card animate__animated animate__fadeIn">
            <img src={heroImageUrl} className="img img-responsive" alt={superhero} />
            <div className="profile-name">{superhero}</div>
            <div className="profile-position">{alter_ego}</div>
            <div className="profile-overview">
                <div className="profile-overview">
                    <div className="row">
                        <div className="col-ms-4">
                            <h3>{publisher}</h3>
                            <p>Primera aparición: <br />{first_appearance}</p>
                            <CharactersByID alter_ego={alter_ego} characters={characters} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
