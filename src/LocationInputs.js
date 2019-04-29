import React from 'react';

export const LocationInputs = ({ showLocationError, postcodeArea, onClickGetLocation}) => {
    const geolocationAvailable = "geolocation" in navigator ? true : false;
    return (
        <div>
            {geolocationAvailable && <div className="useLocation" onClick={() => onClickGetLocation()}>Use my location</div>}
            {showLocationError && <div className="locationError">Sorry, we couldn't find your location.</div>}
            {postcodeArea && <div>{postcodeArea}</div>}
        </div>
    );
}