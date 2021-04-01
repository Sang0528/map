import * as React from "react";

function ShipInfo(props) {
  const { info } = props;
  const displayShipName = `${info.shipname}`;
  const displayOwner = `${info.Owner}`;
  const displayOperator = `${info.Operator}`;
  
  return (
    <div>
      <div>
        Ship Name: {displayShipName}
      </div>
      <div>
        Ship Oner: {displayOwner}
      </div>
      <div>
        Ship Operator: {displayOperator}     
      </div>
      <div>
        <a target="_new" href={`https://en.wikipedia.org/wiki/${info.shipname}`}>
          Wikipedia
        </a>
      </div>
      <img width={240} src={info.image} alt="" />
    </div>
  );
}

export default React.memo(ShipInfo);
