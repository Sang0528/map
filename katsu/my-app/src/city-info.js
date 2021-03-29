import * as React from 'react';

function CityInfo(props) {
  const {info} = props;
  const displayName = `${info.city}, ${info.JapaneseName}`;

  return (
    <div>
      <div>
        {displayName} |{' '}
        <a
          target="_new"
          href={`https://en.wikipedia.org/wiki/${info.city}`}
        >
          Wikipedia
        </a>
      </div>
      <img width={300} src={info.image}/>
    </div>
  );
}

export default React.memo(CityInfo);