export const throttle = (callback: CallableFunction, wait: number) => {
    let timeout: any;
    return (...args: any[]) => {
        if (!timeout) {
            timeout = setTimeout(() => {
                callback(...args)
                timeout = null
            }, wait)
        }
    }
}