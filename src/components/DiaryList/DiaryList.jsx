import { Link } from "react-router";
const DiaryList = (props) => {
  return (
    <main>
      <Link to="/diary/new">New Diary</Link>
      {props.diary.map((diary) => (
        <Link key={diary._id} to={`/diary/${diary._id}`}>
          <article>
            <header>
              <h2>{diary.title}</h2>
              <p>
                {`${diary.author.username} posted on
                ${new Date(diary.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{diary.comments}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default DiaryList;
