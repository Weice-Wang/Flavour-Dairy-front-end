import { useParams, Link } from "react-router";
import { useEffect, useState, useContext } from "react";
import * as diaryService from "../../services/diaryService";
import CommentForm from "../CommentForm/CommentForm";
import { UserContext } from "../../contexts/UserContext";

const DiaryDetails = (props) => {
  const { diaryId } = useParams();
  const { user } = useContext(UserContext);
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

  const handleDeleteComment = async (commentId) => {
    await diaryService.deleteComment(diaryId, commentId);
    setDiary({
      ...diary,
      comments: diary.comments.filter((comment) => comment._id !== commentId),
    });
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
        {diary.author._id === user._id && (
          <>
            <Link to={`/diary/${diaryId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteDiary(diaryId)}>
              Delete
            </button>
          </>
        )}
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
              {diary.author._id === user._id && (
                <>
                  <Link to={`/diary/${diaryId}/comments/${comment._id}/edit`}>
                    Edit
                  </Link>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    Delete
                  </button>
                </>
              )}
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default DiaryDetails;
