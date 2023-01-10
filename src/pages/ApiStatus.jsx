import React from 'react';
import update from 'immutability-helper';
import {connect} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { apiStatus } from '../endpoints/tournaments';


class ApiStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: {},
    }
  }

  componentDidMount() {

    const {dispatch} = this.props;

    this.fetchData();
  }

  fetchData = () => {

    this.setState(update(this.state, {$set: {isFetching: true }}));

    apiStatus()
      .then(response => response.data)
      .then(data => {
          this.setState(
            update(this.state, { $set: {
              data: data,
              isFetching: false
            }})
          );
      })
  };


  render() {

    const {isFetching, data} = this.state;

    return (
      <div className="page">
        {
          isFetching ?
            <CircularProgress
              style={{
                display: 'block',
                margin: '45vh auto'
              }}
            /> :
            <div>
              <p style={{ textAlign : "center" }}>ApiStatus: {data.message}</p>
            </div>
        }
      </div>
    );
  }
}

export default connect()(ApiStatus);