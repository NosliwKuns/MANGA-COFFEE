import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logIn, loginUser, loginWithGoogle, userLog, Verificated } from "../../features/user/userSlice";
import { motion, AnimateSharedLayout } from 'framer-motion'
import { validate } from "./func/validate";
import "../../scss/User/Registration.scss";
import { cardAnimation, gridAnimation } from "../../Animation";

const Logeo = () => {
  const space : any = useRef(null)

  const [input, setInput] = useState<Verificated>({
    email: "", // segio@
    password: "", // sds2
  });

  const [errors, setErrors] = useState<Verificated>({
    email: "",
    password: "",
  });

  const [error, setError] = useState <string>('')
  const user = useAppSelector((state) => state.user);
  const [switchButton , setSwitchB] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (event: any) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit =async (e: any) => {
    e.preventDefault();
    if (errors.email || errors.password || !input.email || !input.password)
      return;
      setError('')
    // dispatch (idUser)  'qqwwq12123444sadas'  // aqui insertar funcion
    // ? no te olvides enviar el user name modificado en el reducer
    try {
      await dispatch(logIn(input.email,input.password))
      dispatch(userLog(input)); //
      alert("acces");
      navigate("/", { replace: true });
      setInput({
        email: "", // segio@
        password: "", // sds2
      });
      setErrors({
        email: "",
        password: "",
      });
    } catch (e :any) {
      if(e.code === 'auth/user-not-found') {
        setError('Correo invalido')
      }
      setError('Correo invalido')
    }
  };

  const handleGoogleSignin = async () =>{
    try{
      await dispatch (loginWithGoogle())
      navigate("/", { replace: true });
    } catch(e :any){
      setError(e.message)
    }
  
  }

  return (
    <div className="modal-exterior">
      <motion.div 
        variants={gridAnimation}
        animate='show'
        exit='hide'
        className="modal-container"
        ref={space}
      >
      <motion.div 
        className={"form_Registration_container"}
        variants={cardAnimation}
        >
        <section></section>
        <form 
          onSubmit={handleSubmit}
          className='form-content'
        >
        {/* <h2 onClick={() => navigate("/", { replace: true })}>Back Home</h2> */}
        {/* {error && <div className="form_Registration_span"> <span>{error}</span></div>} */}
          {/* <div className="form_Registration_title"> */}
            <h3>Welcome Back !</h3>
          {/* </div> */}

          {/* <div className="form_Registration_input"> */}
            {/* <label htmlFor="emial">Email :</label>
            <input
              name="email"
              type="text"
              placeholder="youremail@company.ldt"
              onChange={handleChange}
              value={input.email}
            />

            {errors.email.length > 1 && <p>{errors.email}</p>}
          </div>

          <div className="form_Registration_input">
          <div className="form_Registration_view_password">

            <label htmlFor="password">Password :</label>
            <input
              name="password"
              type={switchButton ? "text" : "password"}
              placeholder="**********"
              onChange={handleChange}
              value={input.password}
            />
            <div onClick={()=>setSwitchB(!switchButton)}>👀</div>
          </div>
            {errors.password.length > 1 && <p>{errors.password}</p>} */}
          {/* </div> */}
          <div className='form-container'>
      <div className='form-group'>
        <input
          className='form-input'
          type='text'
          id='name'
          name='email'
          placeholder=' '
          value={input.email}
          onChange={handleChange}  
        />
        <label 
          htmlFor='name'
          className='form-label'
        >Email:
        </label>
        <div className='error'>
          {errors.email.length > 1 && <p>{errors.email}</p>}
        </div>
      </div>

      <div className='form-group'>
        <input
          className='form-input'
          type={switchButton ? "text" : "password"}
          id='password'
          value={input.password}
          name='password'
          placeholder=' '
          onChange={handleChange}
        />
        <label 
          htmlFor='password'
          className='form-label'
        >Password:
        </label>
        <div className='error'>
          {errors.password.length > 1 && <p>{errors.password}</p>}
        </div>
      </div>
          <div>
          <button>Log in</button>
          <Link to='/registration'>
            Holi
          </Link>
          </div>
          <span>------------------------------------------</span>
          <div onClick={handleGoogleSignin}>
            <h5>Google Login</h5>
          </div>
      </div>
          

        </form>
      </motion.div>
      </motion.div>
    </div>
  );
};

export default Logeo;
