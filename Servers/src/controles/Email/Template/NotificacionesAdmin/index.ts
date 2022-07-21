
const AdminNotification = (msg: string) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
      <p>${msg}</p>
      </div>
    `;
}

export default AdminNotification;