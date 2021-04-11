import { Dropdown } from "semantic-ui-react";

export default function TagFilter({ setTags }) {
  // Placeholder ptions for tags
  const options = [
    { key: "firstpost", text: "First Post", value: "First Post" },
    { key: "question", text: "Question", value: "Question" },
    { key: "help", text: "Help", value: "Help" },
    { key: "tips", text: "Tips", value: "Tips" },
    { key: "suggestion", text: "Suggestion", value: "Suggestion" },
    { key: "meme", text: "Meme", value: "Meme" },
  ];

  const handleTags = (e, { value }) => {
    setTags(value);
  };
  return (
    <>
      <Dropdown
        placeholder="Select tags"
        fluid
        multiple
        selection
        options={options}
        onChange={handleTags}
      />
    </>
  );
}
