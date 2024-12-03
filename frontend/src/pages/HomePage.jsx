import { useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Spinner from "../components/Spinner";
import useUserProfile from "../hooks/useUserProfile";

const HomePage = () => {
  const { userProfile, repos, loading, userNotFound, getUserProfileAndRepos } = useUserProfile();
  const [sortType, setSortType] = useState("recent");

  useEffect(() => {
    getUserProfileAndRepos("Alxcgs");
  }, [getUserProfileAndRepos]);

  const onSearch = async (e, username) => {
    e.preventDefault();
    await getUserProfileAndRepos(username);
    setSortType("recent");
  };

  const onSort = (sortType) => {
    if (repos.length > 0) {
      if (sortType === "recent") {
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (sortType === "stars") {
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      } else if (sortType === "forks") {
        repos.sort((a, b) => b.forks_count - a.forks_count);
      }
      setSortType(sortType);
      setRepos([...repos]);
    }
  };

  return (
      <div className='m-4'>
        <Search onSearch={onSearch} />
        {userNotFound && !loading && (
            <div className='flex justify-center items-center bg-glass rounded-lg p-4 mx-auto mt-4' style={{ width: 'fit-content' }}>
              <p className='font-bold'>невдалося знайти юзера</p>
            </div>
        )}
        {!userNotFound && (
            <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
              {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
              {!loading && repos.length > 0 && <Repos repos={repos} />}
              {loading && <Spinner />}
            </div>
        )}
      </div>
  );
};

export default HomePage;