import { BsGithub, BsLinkedin } from "react-icons/bs"
import '../../../scss/RightSide/AboutUs.scss'

const AboutUs = () => {

    const members = [
        {   
            picture: 'https://ca.slack-edge.com/TPRS7H4PN-U0368FERG85-6c67e2a7ec1b-512',
            name: 'Andrea',
            lastName: 'Carvajal Osorio',
            gitHub: 'https://github.com/andreacco',
            linkedIn: 'https://www.linkedin.com/in/andrea-carvajal-osorio-16866215b/',
        },
        {   
            picture: 'https://ca.slack-edge.com/TPRS7H4PN-U0382HBN6A3-348cc52af39e-512',
            name: 'Antoni',
            lastName: 'Quispealaya Jipa',
            gitHub: 'https://github.com/NosliwKuns',
            linkedIn: 'https://www.linkedin.com/in/antoni-quispealaya-a054a2229/',
        },
        {   
            picture: 'https://ca.slack-edge.com/TPRS7H4PN-U03604ULKD1-b903d35d3ea1-512',
            name: 'Emmanuel',
            lastName: 'Carrillo',
            gitHub: 'https://github.com/EmaPaul',
            linkedIn: 'https://www.linkedin.com/in/emmanuel-pa%C3%BAl-carrillo-carpio/',
        },
        {   
            picture: 'https://ca.slack-edge.com/TPRS7H4PN-U038AFM0Q3Y-d37fe52865c7-512',
            name: 'Luis Gabriel',
            lastName: 'Valencia',
            gitHub: 'https://github.com/Gabriel-2310',
            linkedIn: 'https://www.linkedin.com/in/luis-gabriel-valencia-morales-723882238/',
        },
        {   
            picture: 'https://ca.slack-edge.com/TPRS7H4PN-U02UUN3N84E-d2cb3f0073b6-512',
            name: 'Jesús Eduardo',
            lastName: 'Moreno',
            gitHub: 'https://github.com/librotero',
            linkedIn: 'https://www.linkedin.com/in/jes%C3%BAs-eduardo-moreno/',
        },
        {   
            picture: 'https://ca.slack-edge.com/TPRS7H4PN-U02P40ZRMC1-125b2ba2338c-512',
            name: 'Rocio',
            lastName: 'Albani',
            gitHub: 'https://github.com/rochialbani',
            linkedIn: 'https://www.linkedin.com/in/roc%C3%ADo-albani/',
        },
        {   
            picture: 'https://res.cloudinary.com/dbqlsilt2/image/upload/v1658857874/a/47d2e8c2-f361-49c6-bb3c-93968ff99936_gcq0xj.jpg',
            name: 'Ronaldo',
            lastName: 'Jara',
            gitHub: 'https://github.com/sergio-jc',
            linkedIn: 'https://www.linkedin.com/in/ronaldo-jara-617b5223b/',
        },
        {   
            picture: 'https://res.cloudinary.com/dbqlsilt2/image/upload/c_crop,h_990,w_990,x_55/v1658857472/a/a92f19f6-3b98-41d8-9c28-204c1aca2235_fgzldk.jpg',
            name: 'Zaid',
            lastName: 'Raed',
            gitHub: 'https://github.com/zaidraed',
            linkedIn: 'https://www.linkedin.com/in/zaid-raed-737882238/',
        },
    ]
    return (
        <div className="five">
            <div className="AboutUs-container">
                {
                    members.map(e => {
                        return (
                        <div className="AboutUsCard">
                            <div className="blob"></div>
                            <img className="img" src={e.picture} alt="" />
                            <h2>{e.name}<br/><span>{e.lastName}</span></h2>
                            <p>
                                <a href={e.gitHub} target="_blank">
                                    <BsGithub className="svg"
                                    size={27}
                                    color={'#343539'}
                                    />
                                </a>
                                <a href={e.linkedIn} target="_blank">
                                    <BsLinkedin className="svg"
                                    size={27}
                                    color={'#343539'}
                                    />
                                </a>
                            </p>
                        </div>     
                        )
                    })
                }
            </div>
        </div>
    )
}


export default AboutUs