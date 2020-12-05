import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper'

import './style.css'

class Smallcard extends Component {
    render() {
        return (
                <Paper className="card" elevation={0} onClick = {() => {return this.props.setTable(this.props.category)}} >
                <sup><b>{this.props.category}</b></sup>
                <br /> <br />
                <span className="count"><b>{this.props.count}</b></span>
                </Paper>
        )
    }
}

export default Smallcard