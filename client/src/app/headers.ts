
const useHeaders = (token :string) => {
let headers = {
    headers : {
        Authorization : `Bearer ${token}`
    }
}
return headers
}

export default useHeaders

