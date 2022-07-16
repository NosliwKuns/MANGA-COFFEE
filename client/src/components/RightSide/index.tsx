import { useAppSelector } from '../../app/hooks';
import SideBar from './SideBar';

const LeftSide = () => {
  const { user } = useAppSelector(state => state.user)
  return (
    <div className="four">
      <SideBar />
      <div className="greeting">
        {
          user 
          ? <div>
            <h2 style={{color: '#FFFFFF'}} >Welcome, </h2><h2 style={{color: '#EA374B'}} color={'red'}>{user}!</h2> 
          </div>
          :
          <div>
            <h2 style={{color: '#FFFFFF'}} >Welcome to </h2> 
            <h2 style={{color: '#EA374B'}} color={'red'}>Manga Coffee!</h2> 
          </div>
        }
      </div>
    </div>
  )
};

export default LeftSide;