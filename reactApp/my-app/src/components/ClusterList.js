import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ClusterList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Cluster Name</th>
          <th>Template</th>
          <th>Volume Size (GB)</th>
        </tr>
      </thead>
      <tbody>
        {props.clusters.map((cluster) => {
          return (
            <tr key={cluster.id}>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    props.deleteCluster(cluster.id);
                  }}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={"/cluster/" + cluster.slug}>
                  {cluster.clusterName}
                </Link>
              </td>
              <td>{cluster.templateId}</td>
              <td>{cluster.volumeSize} GB</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

ClusterList.propTypes = {
  deleteCluster: PropTypes.func.isRequired,
  clusters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      clusterName: PropTypes.string.isRequired,
      templateId: PropTypes.number.isRequired,
      volumeSize: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ClusterList;
