import DiaryForm from "../components/DiaryForm/DiaryForm";

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
}
const create = async (DiaryFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST", 
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hootFormData),
    });
    return res.json()
  } catch (error) {
    console.log(error);
  }
};

;


export  { 
  create,
  index,
  show

}
