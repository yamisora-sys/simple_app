import {useState} from 'react'

export default function useShare(numberofshare, isShared) {
    const [share, setShare] = useState(numberofshare)
    const [isShare, setisShare] = useState(isShared)
    return {
        share,
        isShare,
        setShare,
        setisShare
    }
}