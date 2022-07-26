import { BsGithub, BsLinkedin } from "react-icons/bs"
import { Link } from "react-router-dom"
import '../../../scss/RightSide/AboutUs.scss'

const AboutUs = () => {
    return (
        <div>
            <div className="AboutUsCard">
                <div className="blob"></div>
                <span className="img"></span>
                <h2>Andrea<br/><span>Carvajal Osorio</span></h2>
                <p>
                    <Link to=''>
                        <BsGithub className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                    <Link to=''>
                        <BsLinkedin className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                </p>
            </div>
            <div className="AboutUsCard">
                <div className="blob"></div>
                <span className="img"></span>
                <h2>Antoni<br/><span>Quispealaya</span></h2>
                <p>
                    <Link to=''>
                        <BsGithub className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                    <Link to=''>
                        <BsLinkedin className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                </p>
            </div>
            <div className="AboutUsCard">
                <div className="blob"></div>
                <span className="img"></span>
                <h2>Emmanuel<br/><span>Carrillo</span></h2>
                <p>
                    <Link to=''>
                        <BsGithub className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                    <Link to=''>
                        <BsLinkedin className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                </p>
            </div>
            <div className="AboutUsCard">
                <div className="blob"></div>
                <span className="img"></span>
                <h2>Luis Gabriel<br/><span>Valencia</span></h2>
                <p>
                    <Link to=''>
                        <BsGithub className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                    <Link to=''>
                        <BsLinkedin className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                </p>
            </div>
            <div className="AboutUsCard">
                <div className="blob"></div>
                <span className="img"></span>
                <h2>Jesús Eduardo<br/><span>Moreno</span></h2>
                <p>
                    <Link to=''>
                        <BsGithub className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                    <Link to=''>
                        <BsLinkedin className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                </p>
            </div>
            <div className="AboutUsCard">
                <div className="blob"></div>
                <span className="img"></span>
                <h2>Rocio<br/><span>Albani</span></h2>
                <p>
                    <Link to=''>
                        <BsGithub className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                    <Link to=''>
                        <BsLinkedin className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                </p>
            </div>
            <div className="AboutUsCard">
                <div className="blob"></div>
                <span className="img"></span>
                <h2>Ronaldo<br/><span>Jara</span></h2>
                <p>
                    <Link to=''>
                        <BsGithub className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                    <Link to=''>
                        <BsLinkedin className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                </p>
            </div>
            <div className="AboutUsCard">
                <div className="blob"></div>
                <span className="img"></span>
                <h2>Zaid<br/><span>Raed</span></h2>
                <p>
                    <Link to=''>
                        <BsGithub className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                    <Link to=''>
                        <BsLinkedin className="svg"
                        size={27}
                        color={'#343539'}
                        />
                    </Link>
                </p>
            </div>
        </div>
    )
}


export default AboutUs