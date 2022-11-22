import { useState } from "react";
import { Link } from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    // preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
    e.preventDefault();

    // Handle password (custom password: 123!@#)
    if (password !== "123!@#") {
      setError(true);
      return;
    }

    // http post to appropriate server route (create post)
    const requestData = JSON.stringify({ title, content });
    const headers = { "content-type": "application/json" };
    console.log(requestData);

    const resp = await fetch("http://localhost:3000/blog/create-post", {
      method: "post",
      body: requestData,
      headers: headers,
    })

    // server responds with new blog model if successful
    const json = await resp.json();
    console.log(json);
    setDone(json);
  }

  if (error) {
    return (
      <div>
        Incorrect Password
      </div>
    )
  }
  else if (done) {
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button>Post</button>
    </form>
  );
}
