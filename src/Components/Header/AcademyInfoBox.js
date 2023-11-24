import React, { useEffect, useState } from 'react'

export default function AcademyInfoBox({count, title, text, icon}) {

    const [courseCounter, setCourseCounter] = useState(0)

    useEffect(() => {
        let interval = setInterval(() => {
          setCourseCounter(prevCount => prevCount + 1)
        }, 10)
    
        if(courseCounter === count) {
          clearInterval(interval)
        }
        return () => clearInterval(interval)
      }, [courseCounter])

    return (
        <>
            <div className="academy__info__box">
                <span className="academy__info__box__icon">{icon}</span>
                <div className="academy__info__box__desc">
                    <h1 className="academy__info__box__desc__title">{courseCounter}{title}</h1>
                    <h1 className="academy__info__box__desc__text">{text}</h1>
                </div>
            </div>
        </>
    )
}
