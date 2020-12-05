import React, { Component } from 'react'
import {Timeline, TimelineEvent} from 'react-event-timeline'
import Axios from 'axios'

import Header from '../../components/headers'


class Dashboard extends Component {

    _header = () => (
        <Header />
    )
    render() {
        return (
            <> {this._header()}
            {
                <span style={{position:"absolute", top: "50%", left: "40%", color: "silver", fontWeight: "bold", fontSize: "35px"}}>Getting Data ! Please Wait...</span>
            }
            </>
        )
    }
}




export default Dashboard