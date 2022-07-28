
const ResetUser = (name: string, id: string) => {
    return `
    <div style="margin-left:21%;">
    <head>
        <link rel="stylesheet" href="./style.css">
    </head>
    
    <div id="email___content" style="
    margin-right: 39%; 
    border: 5px solid;
    background-image: url(https://i.gifer.com/2A64.gif);
    background-size: cover;

    " >
    <h1 style=" 
    font-family: cursive;
    margin-left: 2%;
    ">Cordial saludo ${name}</h1>
    <h3 style=" 
    font-family: cursive;
    margin-left: 2%;
    ">There was recently a request to restpre your account</h3>
    <p style=" 
    font-family: cursive; 
    margin-left: 2%;">Se ha realizado una solicitud para restablecer tu cuenta;</p>

    <p style=" 
    font-family: cursive;
    margin-left: 2%;
    ">you requested this change, set a new password here:</p>
    <a style="margin-left: 35%; color:rgb(0, 26, 255); font-family: cursive;  font-weight:bold;" href="https://manga-coffee.vercel.app/rename/password/${id}" target="_blank" > Set a New Password</a>
    <p style=" 
    font-family: cursive; 
    margin-left: 2%;">If did not make this request, you can ignore this email and your password will remain the same.</p> 
    <img style="margin-right: 2%;" src="https://i.pinimg.com/originals/62/db/78/62db782fa9d80b351e4f8a4d3db48c00.gif"/>  
    </div>
    </div>
    </div>
    `;
}

export default ResetUser;