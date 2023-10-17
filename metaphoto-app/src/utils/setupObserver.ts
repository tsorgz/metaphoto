import { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef } from "react"
import { throttle } from "./throttle"

export const setupObserver = (observer: MutableRefObject<any>, gettr: any, settr: Dispatch<SetStateAction<any>>) => useCallback( (item: any) => {
    if (observer.current) {
        observer.current.disconnect()
    }
    observer.current = new IntersectionObserver(throttle((entries: any[]) => {
        if (entries[0].isIntersecting) {
            settr(gettr + 1)
        }
    }, 500))
    if (item) {
        observer.current.observe(item)
    } 
        
}, [gettr])