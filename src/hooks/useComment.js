import {useState} from 'react'

export default function useComment(numberofcomment, isCommented) {
    const [comment, setComment] = useState(numberofcomment)
    const [isComment, setisComment] = useState(isCommented)
    return {
        comment,
        isComment,
        setComment,
        setisComment
    }
}