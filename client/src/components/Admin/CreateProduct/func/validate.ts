export const validate = (input:any) => {
    const error = {
        title : "" ,
        description : ""
    }
    if(!input.title) {
        error.title = "please insert a title"
    }
    if(!input.description){
        error.description = "please insert a description"
    }
    return error
}