import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import fetchBatches from "../actions/batches/fetch";
import deleteBatch from "../actions/batches/delete";
import Moment from 'moment'
import FlatButton from "material-ui/FlatButton";
import {Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui/Table';
import CreateBatchButton from "../components/CreateBatchButton";

class Batches extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
  }

  goToBatch = batchId => event => this.props.push(`/batches/${batchId}/students`);

  deleteTheBatch = batchId => event => this.props.deleteBatch(batchId);

  renderBatch = (batch, index) => {
    const classNumber = batch.classNumber
    const startDate = Moment(batch.startDate).format('d MMM YYYY')
    const endDate = Moment(batch.endDate).format('d MMM YYYY')

    return (
      <TableRow key={index}>
          <TableRowColumn>{`Class #${classNumber} `}</TableRowColumn>
          <TableRowColumn>{startDate}</TableRowColumn>
          <TableRowColumn>{endDate}</TableRowColumn>
          <TableRowColumn>
            <FlatButton label="View" onClick={this.goToBatch(batch._id)} />
            <FlatButton label="Remove" onClick={this.deleteTheBatch(batch._id)} />
          </TableRowColumn>
        </TableRow>
    )
  }

  render(batch, index){
    const {batches} = this.props
    return (
      <div>
        <h3>Current batches</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Batch</TableHeaderColumn>
                <TableHeaderColumn>Start Date</TableHeaderColumn>
                <TableHeaderColumn>End Date</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
                {batches.map(this.renderBatch)}
            </TableBody>
          </Table>
        <CreateBatchButton />
        </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches });

export default connect(mapStateToProps, { fetchBatches, deleteBatch, push })(Batches);
