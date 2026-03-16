import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import DiaryList from "./components/DiaryList/DiaryList";
import * as diaryService from "./services/diaryService";
import DiaryDetails from "./components/DiaryDetails/DiaryDetails";
import DiaryForm from "./components/DiaryForm/DiaryForm";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  const [diary, setDiary] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllDiary = async () => {
      const diaryData = await diaryService.index();
      setDiary(diaryData);
    };
    if (user) fetchAllDiary();
  }, [user]);

  const handleAddDiary = async (diaryFormData) => {
    const newDiary = await diaryService.create(diaryFormData);
    setDiary([newDiary, ...diary]);
    navigate("/diary");
  };

  const handleDeleteDiary = async (diaryId) => {
    const deletedDiary = await diaryService.deleteDiary(diaryId);
    setDiary(diary.filter((diary) => diary._id !== deletedDiary._id));
    navigate("/diary");
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/diary" element={<DiaryList diary={diary} />} />
            <Route
              path="/diary/:diaryId"
              element={<DiaryDetails handleDeleteDiary={handleDeleteDiary} />}
            />
            <Route
              path="/diary/new"
              element={<DiaryForm handleAddDiary={handleAddDiary} />}
            />
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
