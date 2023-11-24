import { useRef, useState } from 'react'
import './TopBar.css'
import { AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai'
import { BiLogoFacebookCircle, BiLogoLinkedin } from 'react-icons/bi'
import { FaGlobe, FaHeadset } from 'react-icons/fa'
import { TiArrowSortedDown } from 'react-icons/ti'
import SocialMedias from './SocialMedias'
import Languages from './Languages'


export default function TopBar({ info }) {
    const [isOpen, setIsOpen] = useState(true)
    const infosVariable = useRef()

    const languagesBoxHandler = () => {

        const languagesBox = infosVariable.current

        if (isOpen) {
            languagesBox.classList.add('top-bar__left-side__languages__wrapper--active')
            setIsOpen(prevState => !prevState)
        } else if (!isOpen) {
            languagesBox.classList.remove('top-bar__left-side__languages__wrapper--active')
            setIsOpen(prevState => !prevState)
        }
    }

    return (
        <div className='container'>
        
            <div className="top-bar">
                <div className="top-bar__left-side">
                    <div className="top-bar__left-side__social-medias">
                        <SocialMedias icon={<BiLogoLinkedin />} />
                        <SocialMedias icon={<AiOutlineTwitter />} />
                        <SocialMedias icon={<AiOutlineInstagram />} />
                        <SocialMedias icon={<BiLogoFacebookCircle />} />
                    </div>
                    <div className="top-bar__left-side__languages">
                        <h1 className="top-bar__left-side__languages__title" onClick={languagesBoxHandler}><FaGlobe /> زبان <TiArrowSortedDown /></h1>
                        <div className="top-bar__left-side__languages__wrapper" ref={infosVariable}>
                            <Languages imgUrl={'/images/svgs/ir-flag.svg'} nameLanguage={'فارسی'} />
                            <Languages imgUrl={'/images/svgs/uk-flag.svg'} nameLanguage={'انگلیسی'} />
                        </div>
                    </div>
                </div>
                <div className="top-bar__right-side">
                    <div className="top-bar__right-side__contact-us__wrapper">
                        <h1 className="top-bar__right-side__contact-us"><FaHeadset /> با ما تماس بگیرید: {info.phone}</h1>
                    </div>
                </div>
            </div>


        </div>
    )
}
