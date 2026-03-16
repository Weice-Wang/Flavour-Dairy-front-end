import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import * as diaryService from "../../services/diaryService";
import CommentForm from "../CommentForm/CommentForm";

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

  if (!diary) return <main>Loading...</main>;

  const handleAddComment = async (commentFormData) => {
    const newComment = await diaryService.createComment(
      diaryId,
      commentFormData,
    );
    setDiary({ ...diary, comments: [...diary.comments, newComment] });
  };

  const handleDelete = async () => {
    await diaryService.deleteDiary(diaryId);
    navigate("/diary");
  };

  return (
    <main>
      <section>
        <header>
          <h1>{diary.name}</h1>
          <p>{`${diary.author.username} posted on
            ${new Date(diary.createdAt).toLocaleDateString()}`}</p>
        </header>
        <p>Location: {diary.location}</p>
        <p>Cuisine Type: {diary.cuisine}</p>
        <p>Rating: {diary.rating}</p>
      </section>
      <section>
        <h2>Comments</h2>
        {!diary.comments.length && <p>There are no comments.</p>}
        <CommentForm handleAddComment={handleAddComment} />

        {diary.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.username} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default DiaryDetails;
