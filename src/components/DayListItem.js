import React from 'react';
import classnames from 'classnames';

import "components/DayListItem.scss";

export default function DayListItem({
  selected, 
  spots, 
  name, 
  setDay
}) {

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full" : !spots
  });
  const formatSpots = function () {
    const spot = spots;
    if (spot > 1) {
      return `${spot} spots remaining`
    } else if (spot === 1) {
      return `${spot} spot remaining`
    } else {
      return `no spots remaining`
    }
  }
  return (
    <li data-testid="day" className={dayClass} onClick={() => {setDay(name)}}>
      <h2 className="text-regular">{name}</h2> 
      <h3 className="text-light">{formatSpots()}</h3>
    </li>
  )
}