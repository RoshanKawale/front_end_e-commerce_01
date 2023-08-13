import NavBar from '../features/navbar/Navbar';
import UserProfile from '../features/user/component/UserProfile';
function UserProfilePage() {
  return (
    <div>
      <NavBar>
        <h1 className='mx-auto text-2xl'>My Profile</h1>
        <UserProfile></UserProfile>
      </NavBar>
    </div>
  );
}

export default UserProfilePage;