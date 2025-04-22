import Modal from "../UI/ModalWindow/Modal";
import { useContext } from "react";
import { ProfileWindowContext } from "../../store/ProfileWindowProvider";
import styles from "./Profile.module.css";

const Profile = () => {
    const profileWindow = useContext(ProfileWindowContext);
    const { dateOfProfile } = profileWindow;
    const user = dateOfProfile?.user;

    return (
        <Modal onHideCart={profileWindow.hideProfileWindow}>
            <div>
                <h2 className={styles.profileTitle}>User Profile</h2>

                {user ? (
                    <>
                        <p className={styles.profileField}>
                            <strong>Username:</strong> {user.username}
                        </p>
                        <p className={styles.profileField}>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <hr />
                        <p className={styles.profileField}>
                            <strong>Completed tasks:</strong>{" "}
                            {dateOfProfile.completedTotal}
                        </p>
                        <p className={styles.profileField}>
                            <strong>Open tasks:</strong>{" "}
                            {dateOfProfile.uncompletedTotal}
                        </p>
                    </>
                ) : (
                    <p className={styles.loadingMessage}>
                        Loading profile data...
                    </p>
                )}
            </div>
        </Modal>
    );
};

export default Profile;
