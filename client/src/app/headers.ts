
const useHeaders = (token : string | undefined) => {
let headers = {
    headers : {
        Authorization : `Bearer ${token}`
    }
}
return headers
}

export default useHeaders

