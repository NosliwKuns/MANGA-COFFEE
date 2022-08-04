import { SetState } from 'immer/dist/internal';
import { IoMdArrowDropdown } from 'react-icons/io'

const AdminTable = ({setPag, pag, open, setOpen, text, setText, handleClickSections, drop }:any)=> {

  drop.onClick= () => {setOpen(!open)};
  drop.boolean = open;
  
  return (
    <>
      <button
        className={pag === '3' ? 'active' : ''}
        onClick={() => handleClickSections('3')}
      >
        All Users
      </button>
      <button
        className={pag === '4' ? 'active' : ''}
        onClick={() => handleClickSections('4')}
      >
        Ads
      </button>
      <span className="drop-down-create">
        <button 
          className={pag === '5' || pag === '6' 
                      ? 'active' : ''}
        >{text}
          <span 
            onClick={() => setOpen(!open)}
            ref={drop}
            id='is-changing'
          >   
            <IoMdArrowDropdown
            className={open ? 'up' : ''}
            viewBox='0 0 512 262'
            />
          </span>
        </button>
        <div className={open ? "open" : "closed"}>
          <div
          onClick={() => {
            handleClickSections('5')
            setText('Manga')
          }}
          >
            Manga
          </div>
          <div
            onClick={() => {
              handleClickSections('6')
              setText('Product')
            }}
          >
            Product
          </div>
        </div>
      </span>
    </>
  )
}

export default AdminTable