import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import Spinner from '../components/Spinner';
import {useCallback, useEffect} from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setReps] = useState([]);
  const [loading, useState] = useState(false);

  const [sortType, setSortType] = useState("forks");


  const getUserProfileAndRepos = useCallback(async() => {
    setLoading(true);
    try {
      const userRes = await fetch('https://api.github.com/users/alxcgs');
      const userProjile = await userRes.json();
      setUserProfile(userProjile);

      const repoRes = await fetch(userProjile.repos_url);
      const repos = await repoRes.json();
      setReps(repos);
      console.log("userProfile:", userProjile);
      console.log("repos", repos);


    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);
  return (
    <div className='m-4'>
      <Search />
      <SortRepos />
      <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
        <ProfileInfo />
        <Repos />
        <Spinner />
      </div>
    </div>
  );
};

export default HomePage;