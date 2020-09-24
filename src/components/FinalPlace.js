import React from 'react';
import '../Style/style.css';

let FinalPlace = ({ clrToggle, selectedPlaceInfo }) => {
    //console.log(selectedPlaceInfo, clrToggle);
    let add = selectedPlaceInfo.address.split(',');
    //console.log(add);
    let p;
    if (add.length === 3) {
        p = (
            <span style={{ font: 'Rubik, sans-serif', fontSize: '18px'}}>
                {add[1]}, {add[2]}, {selectedPlaceInfo.area}, {selectedPlaceInfo.city}
            </span>
        );
    } else if (add.length === 2) {
        p = (
            <span style={{ font: 'Rubik, sans-serif', fontSize: '18px'}}>
                {add[1]}, {selectedPlaceInfo.area}, {selectedPlaceInfo.city}
            </span>
        );
    } else {
        p = (
            <span style={{ font: 'Rubik, sans-serif', fontSize: '18px'}}>
                {selectedPlaceInfo.area}, {selectedPlaceInfo.city}
            </span>
        );
    }
    return (
        <div className='address_details' style={{ color: clrToggle }}>
            <span style={{ font: 'roboto, sans-serif', fontSize: '30px'}}>{add[0]}</span>
            <br />
            {p}
            <br />
            <span style={{ font: 'Rubik, sans-serif', fontSize: '15px'}}>{selectedPlaceInfo.pType}</span>
            <br />
            <span style={{ font: 'Rubik, sans-serif', fontSize: '15px'}}>Place Code : {selectedPlaceInfo.uCode}</span>
            <br />
        </div>
    );
};

export default FinalPlace;
