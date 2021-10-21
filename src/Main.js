import { useState } from "react";

export default function Main(props) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  function saveMessage() {
    const url = "http://localhost:9000/message";
    const data = { message };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    };

    fetch(url, config)
      .then((res) => res.json())
      .then(console.log(""))
      .catch(console.error);
  }

  function handleFileSelect(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files);
  }

  function saveFile() {
    if (!file) {
      return alert("Select a file first :-)");
    }
    console.log("Sending file to backend now");

    const formData = new FormData();
    formData.append("selectedFile", file);
    formData.append("test", "this is a test");
    formData.append("test2", { foo: "bar" });

    const config = {
      method: "POST",
      body: formData,
    };

    fetch("http://localhost:9000/file", config)
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  }

  return (
    <div>
      <h2>Welcome to the party, {props.user.email}</h2>
      <button onClick={props.logout}>Logout</button>
      <hr />
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={saveMessage}>Save message</button>
      </div>

      <hr />
      <div>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={saveFile}>Save file</button>
      </div>
      {file && (
        <div>
          <div>File name: {file.name}</div>
          <div>File type: {file.type}</div>
          <div>File size: {(file.size / 1024).toFixed(1)}</div>
          <div>File modified date: {file.lastModifiedDate.toISOString()}</div>
        </div>
      )}
    </div>
  );
}
