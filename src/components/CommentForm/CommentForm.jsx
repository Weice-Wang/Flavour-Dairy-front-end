import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as diaryService from "../../services/diaryService";

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: "" });
  const { diaryId, commentId } = useParams();
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (diaryId && commentId) {
      await diaryService.updateComment(diaryId, commentId, formData);
      navigate(`/diary/${diaryId}`);
    } else {
      props.handleAddComment(formData);
    }
    setFormData({ text: "" });
  };

  useEffect(() => {
    const fetchDiary = async () => {
      const diaryData = await diaryService.show(diaryId);
      setFormData(
        diaryData.comments.find((comment) => comment._id === commentId),
      );
    };
    if (diaryId && commentId) fetchDiary();
  }, [diaryId, commentId]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;
