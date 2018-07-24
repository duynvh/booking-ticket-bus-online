import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Geocode from "react-geocode";
import * as configs from '../../../constants/Config';
import {Route, NavLink, Link} from 'react-router-dom';

class RouteDeparture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: '',
            lng: '',
            isMarkerShown: false,
        };
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
          this.setState({ isMarkerShown: true })
        }, 3000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    componentWillMount() {
        this.loadGoogleMap(this.props.route.address);
    }

    loadGoogleMap = (address) => {
        Geocode.setApiKey("AIzaSyCc3zoz5TZaG3w2oF7IeR-fhxNXi8uywNk");
        Geocode.fromAddress(address).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            this.setState({
                lat: lat,
                lng: lng
            });
          },
          error => {
            console.error(error);
          }
        );
    }

    render() {
        let {transhipment_offices} = this.state;
        let _url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCc3zoz5TZaG3w2oF7IeR-fhxNXi8uywNk&q=${this.state.lat},${this.state.lng}`;
        return (
            <div>
                <div className="row">
                  <div className="col-5">
                    <h4 className="mt-15">Các tuyến xuất phát từ</h4>
                    <h3>{this.props.route.name}</h3>
                    <p>{this.props.route.address}</p>
                    <p>Hotline: <strong className="text-success">{this.props.route.hotline}</strong></p>
                  </div>
                  <div className="col-7">
                    <iframe frameBorder="0" style={{ width: "100%", height: "170"}}
                        src={_url}>
                    </iframe>
                  </div>
                </div>
                <hr />
            </div>
        );
    }
}

export default RouteDeparture;
