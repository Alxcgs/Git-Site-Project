export const fetchUserProfileAndRepos = async (username) => {
    const res = await fetch(`/api/users/profile/${username}`);
    if (!res.ok) {
        throw new Error("User not found");
    }
    return res.json();
};

export const likeUserProfile = async (username) => {
    const res = await fetch(`/api/users/like/${username}`, {
        method: "POST",
        credentials: "include",
    });
    const data = await res.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data;
};

export const fetchLikes = async () => {
    const res = await fetch("/api/users/likes", { credentials: "include" });
    const data = await res.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data.likedBy;
};