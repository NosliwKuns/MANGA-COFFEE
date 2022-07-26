

const ResetPass = (name: string, id: string) => {
    return `
    <div style="margin-left:21%;">
    <head>
        <link rel="stylesheet" href="./style.css">
    </head>
    
    <div id="email___content" style="margin-right: 37%;" >
    <h1>Hello ${name}</h1>
    <h3>Reset Account Password</h3>
    <p>There was recently a request to change the passwor for your account;</p>
    <p>If you requested this change, set a new password here: </p>
    <a style="margin-left: 35%; color:rgb(0, 26, 255); font-weight:bold;" href="http://localhost:3000/rename/password/${id}" target="_blank" > Set a New Password</a>
    <p>If did not make this request, you can ignore this email and your password will remain the same.</p>
           
    </div>
    </div>
    `;
}

export default ResetPass;