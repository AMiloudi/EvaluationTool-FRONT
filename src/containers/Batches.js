import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import fetchBatches from "../actions/batches/fetch";
import deleteBatch from "../actions/batches/delete";
import Moment from 'moment'
import FlatButton from "material-ui/FlatButton";
import {Card, CardTitle, CardActions } from 'material-ui/Card';
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
      <div className= "batch-card" key={index}>
      <Card>
        <CardTitle>
        {`Class ${classNumber} `} {` Duration of the Course: ${startDate} - ${endDate}`}
        </CardTitle>
      </Card>
      <CardActions>
        <FlatButton label="View" onClick={this.goToBatch(batch._id)} />
        <FlatButton label="Edit"   />
        <FlatButton label="Remove" onClick={this.deleteTheBatch(batch._id)} />
      </CardActions>
      </div>
    )
  }

  render(batch, index){
    const {batches} = this.props
    return (
      <div>
      <h3>Current batches</h3>
      <Card>{batches.map(this.renderBatch)}</Card>
      <CreateBatchButton />
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches });

export default connect(mapStateToProps, { fetchBatches, deleteBatch, push })(Batches);
