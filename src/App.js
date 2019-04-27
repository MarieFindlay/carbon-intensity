import React from "react";

const getPast24Hrs = async () => {
  console.log('inside');
  const result = await fetch('https://api.carbonintensity.org.uk/intensity/2019-04-27T08:30Z/pt24h')
  const json = await result.json();
  return json.data;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      data: []
    };
  }

  async componentDidMount() {
    try{
      const data = await getPast24Hrs();
      this.setState({data, loading: false})
    } catch(error) {
      this.setState(error);
    }
  }

  render() {
    const { error, loading, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {data.map(halfHour => (
            <li>
              {halfHour.from} {halfHour.intensity.actual}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default App;