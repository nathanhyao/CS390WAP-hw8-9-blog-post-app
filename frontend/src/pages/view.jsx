import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function View() {
  const [posts, setPosts] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async function () {
      const req = await fetch("http://localhost:3000/blog/");
      const json = await req.json();
      setPosts(json);
    })();
  }, [done]);

  async function handleClick(title, content, e) {
    // preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
    e.preventDefault();

    // http post to appropriate server route (create post)
    const requestData = JSON.stringify({ title, content });
    const headers = { "content-type": "application/json" };
    console.log("requestData: ", requestData);

    const resp = await fetch("http://localhost:3000/blog/delete-post", {
      method: "post",
      body: requestData,
      headers: headers,
    })

    // server responds with new blog model if successful
    const json = await resp.json();
    console.log(json);
    setDone(json);
  }

  return (
    <div>
      <Link to="/"> Home</Link>
      <div>
        {posts.map((post) => (
          <div
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <h2 style={{ margin: "0.2rem" }}>{post.title}</h2>
            <div>{post.content}</div>

            <button onClick={(e) => handleClick(post.title, post.content, e)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
