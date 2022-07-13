

const getTemplate = (name: string, token: string) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="https://i.imgur.com/eboNR82.png" alt="">
          <h2>Hola ${ name }</h2>
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="http://localhost:5000/api/user/verificated/${ token }"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
}

export default getTemplate;