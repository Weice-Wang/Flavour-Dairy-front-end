const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/diary`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (diaryId) => {
  try {
    const res = await fetch(`${BASE_URL}/${diaryId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (diaryFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diaryFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createComment = async (diaryId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${diaryId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteDiary = async (diaryId) => {
  try {
    const res = await fetch(`${BASE_URL}/${diaryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateDiary = async (diaryId, diaryFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${diaryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diaryFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (diaryId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${diaryId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateComment = async (diaryId, commentId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${diaryId}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  index,
  show,
  create,
  createComment,
  deleteDiary,
  updateDiary,
  deleteComment,
  updateComment,
};
