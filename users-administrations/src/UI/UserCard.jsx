import React from "react";

export default function UserCard(props) {
  const { firstName, lastName, email, id, loading } = props;

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      alert("Email copied to clipboard!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card-container">
      <div className="details">
        <span className="name">
          Name: {firstName} {lastName}
        </span>
        <span className="email" onClick={() => copyEmailToClipboard()}>
          Email: {email}
        </span>
      </div>
      <div className="delete-user">
        <button onClick={(e) => props.deleteUserById(e, id)} disabled={loading}>
          Delete User
        </button>
      </div>
    </div>
  );
}
