import React, { useEffect, useRef } from "react";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "ca" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

function SearchLocationInput(props) {
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzLz6KZRNduQOtj8jcqsgIRLL7lEFlpUY&libraries=places`,
      () => handleScriptLoad(props.setLocation, autoCompleteRef)
    );
  }, [props.setLocation]);

  return (
    <div className="search-location-input">
      <input
        className="form-control"
        ref={autoCompleteRef}
        onChange={(event) => props.setLocation(event.target.value)}
        placeholder="Enter a City"
        value={props.location}
      />
    </div>
  );
}

export default SearchLocationInput;
