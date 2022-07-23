
const AdminNotiPubli = (msg: string, image: any) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>      
      <div id="email___content">
      <img src=${image} >
      <p>${msg}</p>
      </div>
    `;
}

export default AdminNotiPubli;