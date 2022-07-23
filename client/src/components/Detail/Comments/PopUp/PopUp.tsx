import { motion } from 'framer-motion';
import { useAppDispatch } from '../../../../app/hooks';
import Backdrop from './Backdrop';
import { deleteComment } from '../../../../features/manga/mangaSlice'; 
import useModal from '../../../../app/customHooks/useModal';

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

const PopUp = ({handleClose, text, CommentUserId, userId, commentId, mangaId}: any) => {
    const dispatch = useAppDispatch()
    const { modalOpen, close, open } = useModal();

    const handleClick = () => {
        if(CommentUserId === userId){
            dispatch(deleteComment(commentId, mangaId))
            handleClose()
        } else {
            alert('invalid Action!')
        }
    }
    return (
        <Backdrop
        onClick={handleClose}
        >
            <motion.div 
            onClick={(e) => e.stopPropagation()}
            className="modal orange-gradient"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
                <button onClick={handleClose}>X</button>
                <p>{text}</p>
                {text === "Are you sure you want to delete this comment?" 
                ? <button onClick={() => handleClick()}>
                Delete
                </button>
                : ""}
                
            </motion.div>
        </Backdrop>
    )
}

export default PopUp