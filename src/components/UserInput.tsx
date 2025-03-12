// components/UserInput.tsx
import { useState } from "react";

interface UserInputProps {
  onSubmit: (usernames: {
    github: string;
    twitter: string;
    instagram: string;
  }) => void;
}

export const UserInput = ({ onSubmit }: UserInputProps) => {
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ github, twitter, instagram });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="GitHub Username"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <input
        type="text"
        placeholder="Twitter Username"
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
      />
      <input
        type="text"
        placeholder="Instagram Username"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
      />
      <button type="submit">Fetch Data</button>
    </form>
  );
};
