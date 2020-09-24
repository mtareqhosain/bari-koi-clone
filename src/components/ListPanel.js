import React from 'react';
import '../Style/style.css';

let ListPanel = ({ color, item, onSelect }) => {
    let add = item.address.split(',');
    //console.log(add);
    let p;
    if (add.length === 3) {
        p = (
            <p>
                {add[1]}, {add[2]}, {item.area}, {item.city}
            </p>
        );
    } else if (add.length === 2) {
        p = (
            <p>
                {add[1]}, {item.area}, {item.city}
            </p>
        );
    } else {
        p = (
            <p>
                {item.area}, {item.city}
            </p>
        );
    }

    return (
        <li className='list' style={{ backgroundColor: color }} onClick={onSelect}>
            <span>
                <h5>{add[0]}</h5>
                {'\n'}
                {p}
            </span>
        </li>
    );
};

export default ListPanel;
