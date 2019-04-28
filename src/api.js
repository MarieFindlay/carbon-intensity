export const fetchPast24Hrs = async (time) => {
    const result = await fetch(`https://api.carbonintensity.org.uk/intensity/${time}/pt24h`)
    const json = await result.json();
    return json.data;
  }

export const fetchNext24Hrs = async (time) => {
    const result = await fetch(`https://api.carbonintensity.org.uk/intensity/${time}/fw24h`)
    const json = await result.json();
    return json.data;
}

export const fetchNext48Hrs = async (time) => {
    const result = await fetch(`https://api.carbonintensity.org.uk/intensity/${time}/fw48h`)
    const json = await result.json();
    return json.data;
}

export const fetchPast24HrsByPostcode = async (time, postcodeArea) => {
    const result = await fetch(`https://api.carbonintensity.org.uk/regional/intensity/${time}/pt24h/postcode/${postcodeArea}`);
    const json = await result.json();
    console.log(json);
    return json.data.data;
}

export const fetchNext48HrsByPostcode = async (time, postcodeArea) => {
    const result = await fetch(`https://api.carbonintensity.org.uk/regional/intensity/${time}/fw48h/postcode/${postcodeArea}`);
    const json = await result.json();
    console.log(json);
    return json.data.data;
}

export const getPostcodeFromCoords = async (long, lat) => {
    const result = await fetch(`https://api.postcodes.io/postcodes?lon=${long}&lat=${lat}`)
    const json = await result.json();
    const data = json.result;
    return data[0].outcode;
}