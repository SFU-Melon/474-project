
import { Label } from 'semantic-ui-react'
import { useEffect, useState } from "react";
import Utility from "../utils";

const Tags = (props) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setTags(props?.tags);
    }, [props]);

    return (
        <div className="d-flex flex-row mb-3 align-items-start">
        <h4 className ="me-2">{tags ? "Tags: " : ""}</h4>
        { tags ? 
        (
            tags.map((item, i) => (
            <Label as='a' color={`${Utility.getLabelColor(item)}`} >
                {item}
            </Label>
            ))
        )
        :(<div></div>) }
        </div>
    )
}

export default Tags;