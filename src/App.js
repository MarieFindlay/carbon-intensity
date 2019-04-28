import React from "react";
import moment from 'moment';
import { fetchPast24Hrs, fetchNext48Hrs, getPostcodeFromCoords, fetchPast24HrsByPostcode, fetchNext48HrsByPostcode } from './api';
import { TIMES_ON_AXIS, SCROLL_DIRECTIONS, SCROLL_SPEED } from './constants';
import { getDefaultDataInView, getGraphReadyData, detectScroll } from './utils';

import { IntensityGraph } from './Graph';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataInView: [],
      baseTime: null,
      loadingError: null,
      loading: true,
      scrolling: false,
      startScrollPosition: null,
      postcodeArea: null,
      showLocationError: false,
      locationLoading: false,
    };
  }

  async componentDidMount () {
    try{
      const timeAtMount = moment().toISOString().slice(0, -8) + 'Z';
      await this.setState({ baseTime: timeAtMount });
      const past24Hrs = await fetchPast24Hrs(this.state.baseTime);
      const next48Hrs = await fetchNext48Hrs(this.state.baseTime);
      const data = [...past24Hrs, ...next48Hrs];
      const dataInView = getDefaultDataInView(data);
      this.setState({data, dataInView, loading: false});
    } catch(error) {
      this.setState({loadingError: error, loading: false});
    }
  }

  async componentDidUpdate (prevProps, prevState) {
    if (this.state.postcodeArea !== prevState.postcodeArea) {
      this.setState({ loading: true});
      try {
        const timeAtUpdate = moment().toISOString().slice(0, -8) + 'Z';
        await this.setState({ baseTime: timeAtUpdate });
        const past24Hrs = await fetchPast24HrsByPostcode(this.state.baseTime, this.state.postcodeArea);
        console.log(past24Hrs);
        const next48Hrs = await fetchNext48HrsByPostcode(this.state.baseTime, this.state.postcodeArea);
        console.log(next48Hrs);
        const data = [...past24Hrs, ...next48Hrs];
        console.log(data);
        const dataInView = getDefaultDataInView(data);
        this.setState({data, dataInView, loading: false});
      } catch(error) {
        this.setState({loadingError: error, loading: false});
      }
    } else return;
  }

  handleStartScroll (e) {
    this.setState({
      scrolling: true,
      startScrollPosition: e.pageX
    })
  }

  handleEndScroll (e) {
    this.setState({scrolling: false});
  }

 handleScroll (e) {
    if (this.state.scrolling) {
      const scrollDirection = detectScroll(e, this.state.startScrollPosition);
      if (scrollDirection === SCROLL_DIRECTIONS.RIGHT) {
        this.scrollInDirection(SCROLL_DIRECTIONS.RIGHT);
      } else if (scrollDirection === SCROLL_DIRECTIONS.LEFT) {
        this.scrollInDirection(SCROLL_DIRECTIONS.LEFT);
      } else return;
    } else return;
  }

  scrollInDirection (direction) {
    const { data, dataInView } = this.state;
    const dataInViewStartIndex = data.findIndex(item => item === dataInView[0]);
    if (direction === SCROLL_DIRECTIONS.RIGHT) {
      let startIndex = dataInViewStartIndex - SCROLL_SPEED;
      let lastIndex = dataInViewStartIndex + TIMES_ON_AXIS - SCROLL_SPEED;
      if (startIndex === 0) { return };
      this.setState({ dataInView: this.state.data.slice(startIndex, lastIndex) });
    } else if (direction === SCROLL_DIRECTIONS.LEFT) {
      let startIndex = dataInViewStartIndex + SCROLL_SPEED;
      let lastIndex = dataInViewStartIndex + TIMES_ON_AXIS + SCROLL_SPEED;
      if (lastIndex === data.length + 1) { return };
      this.setState({ dataInView: this.state.data.slice(startIndex, lastIndex) });
    }
  }

  fetchCoordsError () {
    this.setState({ showLocationError: true });
  }

  async fetchCoordsSuccess (position) {
    try {
        const lat = await position.coords.latitude;
        const long = await position.coords.longitude;
        const postcodeArea = await getPostcodeFromCoords(long, lat)
        this.setState({ postcodeArea });
    } catch (error) {
      this.setState({ showLocationError: true })
    }
  }

  async getLocation () {
    this.setState({ locationLoading: true});
    await navigator.geolocation.getCurrentPosition((position) => this.fetchCoordsSuccess(position), () => this.fetchCoordsError());
    this.setState({ locationLoading: false});
  }

  render() {
    const { loadingError, loading, data, dataInView, locationLoading, showLocationError, postcodeArea } = this.state;
    const graphReadyData = getGraphReadyData(dataInView);
    const geolocationAvailable = "geolocation" in navigator ? true : false;
    if (loadingError) {
      return <div>Error: {loadingError.message}</div>;
    } else if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="topContainer">
          <div className="useLocation" onClick={() => this.getLocation()}>Use my postcode</div>
          {locationLoading && <div className="locationLoadingInfo">Location loading...</div>}
          {showLocationError && <div className="locationLoadingInfo">Sorry, we couldn't find your location.</div>}
          {postcodeArea && <div>{postcodeArea}</div>}
          <div className='graphContainer' style={{height: '700px' }}
            onMouseDown={(e) => this.handleStartScroll(e)}
            onMouseUp={(e) => this.handleEndScroll(e)}
            onMouseMove={(e) => this.handleScroll(e)}>
            <IntensityGraph data={graphReadyData}/>
          </div>
        </div>
      );
    }
  }
}

export default App;