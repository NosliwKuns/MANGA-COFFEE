import AdminTable from "../AbminTable";
import { useState } from 'react';

const UserSections = ( { setPag, pag, admin, drop } : any) => {

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('Create');

  const handleClickSections = (value : string) => {
    window.localStorage.setItem("pagAdmin", value);
    text !== 'Create' ? setText("Create") : ''
    setPag(value);
  };


  return (
    <div>
      <button
          className={pag === '1' ? 'active' : ''}
          onClick={() => handleClickSections('1')}
        >
          My Info
        </button>
        <button
          className={pag === '2' ? 'active' : ''}
          onClick={() => handleClickSections('2')}
        >
          Purcheses
        </button>
        {admin && 
          <AdminTable 
            setPag={setPag} 
            pag={pag}
            open={open}
            setOpen={setOpen}
            text={text}
            setText={setText}
            handleClickSections={handleClickSections}
            drop={drop}
          />
        }
    </div>
  )
}; export default UserSections;