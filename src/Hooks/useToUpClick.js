import React from 'react'

export default function useToUpClick() {

    const toUpHandler = () => {
        window.scroll(0, 0)
    }


    return [toUpHandler]
}
