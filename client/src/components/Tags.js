import { Label } from "semantic-ui-react";
import { useEffect, useState } from "react";
import Utility from "@utils";

const Tags = (props) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(props?.tags);
  }, [props]);

  return (
    <div className="d-flex flex-row mb-3 align-items-start overflow-auto">
      <h4 className="me-2">{tags?.[0] ? "Tags: " : ""}</h4>
      <div>
        {tags ? (
          tags.map((item, i) => (
            <Label
              //as="a"
              color={`${Utility.getLabelColor(item)}`}
              className="mb-1 mb-md-0"
              key={i}
            >
              {item}
            </Label>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Tags;
