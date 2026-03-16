import { Link } from "react-router";
const DiaryList = (props) => {
  return (
    <main>
      {props.diary.map((diary) => (
        <Link key={diary._id} to={`/diary/${diary._id}`}>
          <article>
            <header>
              <h2>{diary.name}</h2>
              <p>
                {`${diary.author.username} posted on
                ${new Date(diary.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            {diary.comments.map((comment) => (
              <p key={comment._id}>{comment.text}</p>
            ))}
          </article>
        </Link>
      ))}
    </main>
  );
};

export default DiaryList;
