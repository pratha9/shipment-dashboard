import React, { Component } from 'react'
import {Timeline, TimelineEvent} from 'react-event-timeline'
import Axios from 'axios'

import Header from '../../components/headers'
import Smallcard from '../../components/card'
import Table from '../../components/table'


class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {

            },
            counters: {

            },
            tableData : [],
            loading: true,
            timeLineData: [],
        }
    }

    async componentDidMount() {
        const response = await Axios.post(
            'https://f0ztti2nsk.execute-api.ap-south-1.amazonaws.com/v1/consignment/fetch', 
            {
                "email": "mayankmittal@intugine.com"
            },
            {
                headers : {
                    Authorization : 'Bearer tTU3gFVUdP'
                }
            }
        )
        const { data } = response
        this.setState({ data, loading:false })
        this._categoryCounter()
    }

    _categoryCounter = () => {
        const counters = this.state.data.reduce(
            (previousValue, currentValue) => {
                const { current_status_code } = currentValue
                if (previousValue.hasOwnProperty(current_status_code)) {
                    previousValue[current_status_code] += 1
                } else {
                    previousValue[current_status_code] = 1
                }
                return previousValue
            }, {}
        )
        this.setState({ counters })
        this._setTable("OOD")
    }

    _setTable = (category) => {
        const tableData = this.state.data.filter(item => {
            return item.current_status_code === category
        })
        this.setState({tableData})
    }

    _header = () => (
        <Header />
    )

    _categoryCard = () => {
        const keys = Object.keys(this.state.counters);
        return (
            <div style={{display: 'flex', flexDirection: 'row' , justifyContent:'center', marginTop : '20px'}}>
                 {keys.map(item => {
                return (
                    <Smallcard category = {item} count = {this.state.counters[item]} setTable = {this._setTable}/> 
                )
            })}
            </div>
           

        )
    }

    _setTimeLine = (id) => {
        const timeLineData = this.state.tableData.filter(item => {
            if( item._id === id ){
                return item
            }
        })
        this.setState({timeLineData})
    }

    _tableData = () => {
        return(
                <Table tableDetails = {this.state.tableData} setTimeLine={(id) => this._setTimeLine(id)}/>
        )
    }

    _timeline = () => {
        if(this.state.timeLineData.length){
            if(this.state.timeLineData[0].scan)
            {
                const timeLineData = this.state.timeLineData[0].scan
                return(
                    <Timeline lineColor="blue" lineStyle={{width: 3.5}}>
                        {
                            <>                        
                            
                            {timeLineData.map(item => {

                                var date = new Date(item.time)
                                var _date = date.getDate().toString() +"-"+ date.getMonth().toString()+"-"+ date.getFullYear().toString()
                                var hour = date.getHours();
                                var mins = date.getMinutes();

                                if(hour < 10)
                                    hour = "0"+hour   
                                
                                if(mins < 10)
                                    mins = "0"+mins

                                var time = hour +":"+ mins

                                return (
                                    <>
                                    <TimelineEvent bubbleStyle={{backgroundColor: 'blue'}} iconColor="blue"
                                                    style={{boxShadow: '2px 2px 2px 1px silver'}}
                                                    >
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <span>
                                                    <td style={{width: 250}}>{item.status_detail == "DELIVERED" ? <span style={{color:"green", fontWeight:"bold"}}>DELIVERED</span> : `${item.status_detail}`}</td>
                                                    <td style={{width: 150}}>{item.status_detail == "DELIVERED" ? <span style={{color:"green", fontWeight:"bold"}}>{`${_date}`}</span> : `${_date}`}</td>
                                                    <td style={{width: 150}}>{item.status_detail == "DELIVERED" ? <span style={{color:"green", fontWeight:"bold"}}>{`${time}`}</span> : `${time}`}</td>
                                                    </span>
                                                </tr>
                                            </tbody>
                                        </table>
                                           
                                      
                                    </TimelineEvent>
                                
                                    </>
                                ) 
                            })}
                    
                            </>
                        }
                    </Timeline>
                )
            }
            else
            {
                return (

                    <Timeline lineColor="red" lineStyle={{width: 3.5}}>
                        <TimelineEvent bubbleStyle={{backgroundColor: 'red'}} iconColor="red"
                                        style={{boxShadow: '2px 2px 2px 1px silver'}}>
                            <span style={{ color: "red", fontWeight: "bold"}}>
                                No Information Yet
                            </span>
                        </TimelineEvent>
                    </Timeline>

                )
            }
        }
    }

    _dataInsight = () => {
        return (
            <>
                <div
                    style={{
                        display: 'flex', flexDirection: 'row' , justifyContent:'center'
                    }}
                >
                    <div style={{
                        height:"500px",
                        overflowX:"none",
                        flexBasis: "28%",
                        padding:"3%"
                    }}>
                    {this._timeline()}  
                    </div>
                    <div style={{
                        height:"500px",
                        overflowY:"auto",
                        overflowX:"auto",
                        flexBasis: "70%"
                    }}>
                    {this._tableData()}
                    </div>
                </div>
                
            </>
        )
    }

    _generateContainer = () => {
        
        return (
            <>
                {this._categoryCard()}
                {this._dataInsight()}
            </>
        )
    }
    render() {
        return (
            <> {this._header()}
            {
                this.state.loading? 
                            <span style={{position:"absolute", top: "50%", left: "40%", color: "silver", fontWeight: "bold", fontSize: "35px"}}>Getting Data ! Please Wait...</span>
                            : this._generateContainer()
            }
            </>
        )
    }
}




export default Dashboard