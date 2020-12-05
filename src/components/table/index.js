import React, { Component } from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './style.css'

class TableComponent extends Component{
    render(){
        return(
            <TableContainer component={Paper} style={{borderTop: "2px solid silver"}}>
                <Table stickyHeader={true}  style={{minWidth: 650, paddingTop: "1%"}} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{color: "silver", fontWeight: "bold", backgroundColor: "white", position: "sticky", top: 0}}>AWBNUMBER</TableCell>
                        <TableCell align="center" style={{color: "silver", fontWeight: "bold", backgroundColor: "white", position: "sticky", top: 0}}>TRANSPORTER</TableCell>
                        <TableCell align="center" style={{color: "silver", fontWeight: "bold", backgroundColor: "white", position: "sticky", top: 0}}>SOURCE</TableCell>
                        <TableCell align="center" style={{color: "silver", fontWeight: "bold", backgroundColor: "white", position: "sticky", top: 0}}>DESTINATION</TableCell>
                        <TableCell align="center" style={{color: "silver", fontWeight: "bold", backgroundColor: "white", position: "sticky", top: 0}}>BRAND</TableCell>
                        <TableCell align="center" style={{color: "silver", fontWeight: "bold", backgroundColor: "white", position: "sticky", top: 0}}>START DATE</TableCell>
                        <TableCell align="center" style={{color: "silver", fontWeight: "bold", backgroundColor: "white", position: "sticky", top: 0}}>ETD</TableCell>
                        <TableCell align="center" style={{color: "silver", fontWeight: "bold", backgroundColor: "white", position: "sticky", top: 0}}>STATUS</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.tableDetails.map(row => (
                        <TableRow onClick={()=> {
                        return this.props.setTimeLine(row._id)}} style={{cursor: "pointer"}}>
                        <TableCell align="center" component="th" scope="row" style={{ fontWeight: "bold"}}>#{row.awbno}</TableCell>
                        <TableCell align="center">{row.carrier}</TableCell>
                        <TableCell align="center">{row.from}</TableCell>
                        <TableCell align="center">{row.to}</TableCell>
                        <TableCell align="center">{row.carrier}</TableCell>
                        <TableCell align="center">{String(new Date(row.pickup_date).getDay() < 10 ? "0"+new Date(row.pickup_date).getDay() : new Date(row.pickup_date).getDay())
                                                    +"/"+String(new Date(row.pickup_date).getMonth() < 10 ? "0"+new Date(row.pickup_date).getMonth() : new Date(row.pickup_date).getMonth())
                                                    +"/"+String(new Date(row.pickup_date).getFullYear())}</TableCell>
                        <TableCell align="center">{row.extra_fields ? String(new Date(row.extra_fields.expected_delivery_date).getDay() < 10 ? 
                                                "0"+new Date(row.extra_fields.expected_delivery_date).getDay() : new Date(row.extra_fields.expected_delivery_date).getDay())
                                                    +"/"+String(new Date(row.extra_fields.expected_delivery_date).getMonth() < 10 ? 
                                                "0"+new Date(row.extra_fields.expected_delivery_date).getMonth() : new Date(row.extra_fields.expected_delivery_date).getMonth())
                                                    +"/"+String(new Date(row.extra_fields.expected_delivery_date).getFullYear()): '-'}</TableCell>
                    <TableCell align="center">{ row.current_status === "Delivered" ? <span style={{color: "green"}}>Delivered</span> :  <span style={{color: "red"}}>{row.current_status}</span>}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default TableComponent