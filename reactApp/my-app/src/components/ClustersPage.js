import React, { useState, useEffect } from "react";
import clusterStore from "../stores/clusterStore";
import ClusterList from "./ClusterList";
import { Link } from "react-router-dom";
import { loadClusters, deleteCluster } from "../actions/clusterActions";

function ClustersPage() {
  const [clusters, setClusters] = useState(clusterStore.getClusters());

  useEffect(() => {
    clusterStore.addChangeListener(onChange);
    if (clusters.length === 0) loadClusters();
    return () => clusterStore.removeChangeListener(onChange); // cleanup on unmount
  }, [clusters.length]);

  function onChange() {
    setClusters(clusterStore.getClusters());
  }

  return (
    <>
      <h2>Clusters</h2>
      <Link className="btn btn-primary" to="/cluster">
        Create Cluster
      </Link>
      <ClusterList clusters={clusters} deleteCluster={deleteCluster} />
    </>
  );
}

export default ClustersPage;
