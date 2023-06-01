import { auth } from '../../config/firebaseConfig';
const handleLogout = async () => {
  try {
    await auth.signOut();
    // Redirect to home page or login page
  } catch (err) {
    console.error(err);
  }
};
const LogoutButton = () => {
  return (
    <button className="inline-flex justify-center px-6 md:px-6 py-2 md:py-2 border-4 border-white rounded-2xl 3xl:rounded-[1.5rem] bg-gradient-to-br from-[#3C1960] via-[#A12669] to-[#FEC261] [box-shadow:0px_0px_40px_5px_rgba(161,38,105,1)]"onClick={handleLogout}>Logout</button>
  );
};
export default LogoutButton;