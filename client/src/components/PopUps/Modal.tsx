import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Backdrop from "./BackDrop";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose}: any) => {

  return (
    <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
          className="modal orange-gradient"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button onClick={handleClose}>X</button>
          <p>You must Sign In to get access to this function</p>
          <Link to={'/registration'}>
            <button>Sign In</button>
          </Link>
        </motion.div>
    </Backdrop>
  );
};

export default Modal;