import { useState } from 'react'
export default function useLike(numberoflike, isLiked) {
    const [like, setLike] = useState(numberoflike)
    const [isLike, setisLike] = useState(isLiked)
    return {
        like,
        isLike,
        setLike,
        setisLike
    }
}