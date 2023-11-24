import React, { useEffect, useState } from 'react'
import './Pagination.css'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'


export default function Pagination({ items, itemsCount, pathName, setShowCourses }) {

  const [pagesCount, setPagesCount] = useState(null)
  const { page } = useParams()

  useEffect(() => {
    let endIndex = itemsCount * page
    let startIndex = endIndex - itemsCount
    let paginatedItems = items?.slice(startIndex, endIndex)
    setShowCourses(paginatedItems)

    let pagesNumber = Math.ceil(items?.length / itemsCount)
    setPagesCount(pagesNumber)
  }, [page, items])

  return (
    <div className='pagination'>
      <div className="pagination__counter">
        {
          pagesCount &&
          Array(pagesCount).fill(0).map((item, index) => (

            index + 1 === Number(page) ? (
              <Link to={`${pathName}/${index + 1}`} className="pagination__counter__count pagination__counter__count--active">
                {index + 1}
              </Link>
            ) : (
              <Link to={`${pathName}/${index + 1}`} className="pagination__counter__count">
                {index + 1}
              </Link>
            )
          ))
        }
      </div>
    </div>
  )
}
