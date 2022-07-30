/* 
User profile includes:
    - saved/liked image card array of GeoCatches
    - completed/posted image card array of Geocatches
    - Subscription button, opens modal to pay through Stripe
*/

import NavBar from '../components/NavBar'
import Header from '../components/Header'

const Profile = () => {
  return (
    <div className="container">
      <Header />
        {/* User Profile Content */}
      <NavBar />
    </div>
  );
};

export default Profile;