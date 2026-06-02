import { forwardRef } from 'react';
import type { UserDetails } from '../../api';
import profile_picture from '../../assets/default_profile_picture.png';

import "./Profile.css";

type Props = {
    user: UserDetails
    onClick?: () => void
};

const Profile = forwardRef<
    HTMLButtonElement,
    Props
>(
    ({ user, onClick }: Props, ref) => (
        <button
            className="profile"
            onClick={onClick}
            ref={ref}
        >
            <span className="profile-username">{user.username}</span>
            <img
                className="profile-picture"
                src={profile_picture}
                alt="Profile Picture"
            />
        </button>
    )
);

export default Profile;