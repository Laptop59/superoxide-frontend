import type { UserDetails } from '../../api';
import profile_picture from '../../assets/default_profile_picture.png';

import "./Profile.css";

type Props = {
    user: UserDetails
};

function Profile({
    user
}: Props) {
    return (
        <button className="profile">
            <span className="profile-username">{user.username}</span>
            <img
                className="profile-picture"
                src={profile_picture}
                alt="Profile Picture"
            />
        </button>
    );
}

export default Profile;