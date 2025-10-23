import Navbar from './components/Navbar/navbar';
// import LeftPanel from './components/Left-panel/left-panel'; // BACKUP: Uncomment to restore left panel
import RightPanel from './components/Right-panel/right-panel';
import Profile from './components/Profile/profile';
import SplineHero from './components/SplineHero/SplineHero';
import './App.css';

function App() {
  return (
    <div className='app-container'>
      <Navbar className='navbar' />
      <SplineHero />
      <div className='content-wrapper'>
        <div className='vertical-div'>
          {/* <div className='left-panel'><LeftPanel /></div> */} {/* BACKUP: Uncomment to restore left panel */}
          <Profile className='profile' />
          <RightPanel className='right-panel' />
        </div>
      </div>
    </div>
  );
}

export default App;
