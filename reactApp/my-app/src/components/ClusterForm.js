import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

function ClusterForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="clusterName"
        label="Cluster Name"
        onChange={props.onChange}
        name="clusterName"
        value={props.cluster.clusterName}
        error={props.errors.clusterName}
      />

      <div className="form-group">
        <label htmlFor="template">Cluster Template</label>
        <div className="field">
          <select
            id="template"
            name="templateId"
            onChange={props.onChange}
            value={props.cluster.templateId || ""}
            className="form-control"
          >
            <option value="" />
            <option value="1">v1.17.3.1</option>
            <option value="2">v1.15.7</option>
            {/* <option value="3">v1.17.3.deprecated</option> */}
          </select>
        </div>
        {props.errors.templateId && (
          <div className="alert alert-danger">{props.errors.templateId}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="volumeSize">Docker volume size (GB)</label>
        <div className="field">
          <input
            id="volumeSize"
            type="number"
            min="1"
            max="100000"
            onChange={props.onChange}
            name="volumeSize"
            className="form-control"
            value={props.cluster.volumeSize}
          />
        </div>
        {props.errors.volumeSize && (
          <div className="alert alert-danger">{props.errors.volumeSize}</div>
        )}
      </div>

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

ClusterForm.propTypes = {
  cluster: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ClusterForm;
