
const AdminNotification = (image: string) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
      <img src=${image}>
      </div>
    `;
}

export default AdminNotification;