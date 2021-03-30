import * as React from "react";

function CityInfo(props) {
  const { info } = props;
  const displayName = `${info.city}, ${info.JapaneseName}`;

  return (
    <div>
      <div>
        {displayName} |{" "}
        <a target="_new" href={`https://en.wikipedia.org/wiki/${info.city}`}>
          Wikipedia
        </a>
      </div>
      <img width={240} src={info.image} alt="" />
    </div>
  );
}

export default React.memo(CityInfo);
