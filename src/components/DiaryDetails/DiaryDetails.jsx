import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import * as diaryService from "../../services/diaryService";


const DiaryDetails = () => {
  const { diaryId } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState(null);
  useEffect(() => {
    const fetchDiary = async () => {
      const diaryData = await diaryService.show(diaryId);
      setDiary(diaryData);
    };

    fetchDiary();
  }, [diaryId]);

  if (!diary) return <h1>Loading...</h1>;
  
const handleDelete = async () => {
  await diaryService.deleteDiary(diaryId);
  navigate("/diary");
};

  return (
  <main>
    <h1>Diary Details</h1>
    <p>{diary?.name}</p>
    <p>{diary?.location}</p>
    <p>{diary?.cuisine}</p>
    <p>{diary?.rating}</p>
    <p>{diary.author?.username}</p>
    <Link to={`/diary/${diaryId}/edit`}>Edit</Link>
    <button onClick={handleDelete}>Delete</button>
  </main>
);
};

export default DiaryDetails;