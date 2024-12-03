import { useState, useCallback } from "react";
import { fetchUserProfileAndRepos } from "../services/apiService";

const useUserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);

    const getUserProfileAndRepos = useCallback(async (username) => {
        setLoading(true);
        setUserNotFound(false);
        try {
            const data = await fetchUserProfileAndRepos(username);
            setRepos(data.repos);
            setUserProfile(data.userProfile);
        } catch (error) {
            setUserNotFound(true);
            setRepos([]);
        } finally {
            setLoading(false);
        }
    }, []);

    return { userProfile, repos, loading, userNotFound, getUserProfileAndRepos };
};

export default useUserProfile;