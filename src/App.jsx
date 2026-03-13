import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import DiaryList from "./components/DiaryList/DiaryList";
import * as diaryService from "./services/diaryService";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  const [diary, setDiary] = useState([]);

  useEffect(() => {
    const fetchAllDiary = async () => {
      const diaryData = await diaryService.index();
      setDiary(diaryData);
    };
    if (user) fetchAllDiary();
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/diary" element={<DiaryList diary={diary} />} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
