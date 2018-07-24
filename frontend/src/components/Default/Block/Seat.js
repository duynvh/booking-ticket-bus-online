import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/reserve';
import axios from 'axios';
import * as configs from '../../../constants/Config';
class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            customClass: 'color-white',
            schedule_detail_id: '',
            list_seat_reverse: [],
            seats: []
        }
    }

    loadOrder = (date, schedule_detail_id) => {
      let url = `${configs.BASE_URL}order/get-by-date/${schedule_detail_id}/${date}`;
      var list_seat = [];
      axios.get(url).then(response => {
          let data = response.data;
          data.forEach((item)=> {
            item.seat.map((seat, index) => {
              list_seat.push(seat);
            })
          });
          this.setState({
            list_seat_reverse: list_seat,
          });
          this.getClass();
      });
    }

    componentWillMount() {
        this.setState({
            customClass : this.props.className,
            schedule_detail_id: this.props.reserve.schedule_detail_id,
            seats: this.props.reserve.seats,
        });

        this.loadOrder(this.props.reserve.startDate, this.props.reserve.schedule_detail_id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            schedule_detail_id: nextProps.reserve.schedule_detail_id,
            seats: nextProps.reserve.seats,
        });
        this.loadOrder(this.props.reserve.startDate, this.props.reserve.schedule_detail_id);
    }

    handleClick(event, seat) {
        this.setState({
            customClass : this.state.customClass == 'color-primary' ? 'color-white' : 'color-primary'
        });

        if(this.state.customClass === 'color-primary') {
            this.props.removeSeat(seat);
        }
        else {
            this.props.addSeat(seat);
        }
    }

    getClass = () => {
        let {customClass, list_seat_reverse, seats} = this.state;
        let {seat} = this.props;
        if(seats.includes(seat)) {
            this.setState({
                customClass : 'color-primary'
            });
            return;
        }

        if (list_seat_reverse.includes(seat.toString())) {
            this.setState({
                customClass : 'color-gray'
            });
            return;
        }
        else {
            this.setState({
                customClass: 'color-white'
            });
            return;
        }
    }

    render() {
        let {customClass} = this.state;
        let {seat} = this.props;
        let disabled = customClass == 'color-gray' ? true : false;
        return (
            <div key={this.props.index} className='col-md-3 mt-15'>
                <button onClick={(e) => this.handleClick(e, seat)} disabled={disabled} type='button' className={`seat ${customClass}`}>{seat}</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reserve: state.reserve,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addSeat: (seat) => {
            dispatch(actions.addSeat(seat)) ;
        },
        removeSeat: (seat) => {
            dispatch(actions.removeSeat(seat)) ;
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seat);
