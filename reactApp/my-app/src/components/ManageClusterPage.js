import React, { useState, useEffect } from "react";
import ClusterForm from "./ClusterForm";
import clusterStore from "../stores/clusterStore";
import { toast } from "react-toastify";
import * as clusterActions from "../actions/clusterActions";

const ManageClusterPage = (props) => {
  const [errors, setErrors] = useState({});
  const [clusters, setClusters] = useState(clusterStore.getClusters());
  const [cluster, setCluster] = useState({
    id: null,
    slug: "",
    clusterName: "",
    templateId: null,
    volumeSize: null,
  });

  useEffect(() => {
    clusterStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // from the path `/clusters/:slug`
    if (clusters.length === 0) {
      clusterActions.loadClusters();
    } else if (slug) {
      setCluster(clusterStore.getClusterBySlug(slug));
    }
    return () => clusterStore.removeChangeListener(onChange);
  }, [clusters.length, props.match.params.slug]);

  function onChange() {
    setClusters(clusterStore.getClusters());
  }

  function handleChange({ target }) {
    setCluster({
      ...cluster,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!cluster.clusterName) _errors.clusterName = "Cluster Name is required";
    if (!cluster.templateId)
      _errors.templateId = "Cluster template is required";
    // if (!cluster.master)
    //   _errors.master = "Please select the count of master nodes";
    // if (!cluster.node) _errors.node = "Please select the count of nodes";
    if (!cluster.volumeSize)
      _errors.volumeSize = "Please select the docker volume size";
    // if (!cluster.masterNodeFlavor)
    //   _errors.masterNodeFlavor = "Master node flavor is required";
    // if (!cluster.nodeFlavor) _errors.nodeFlavor = "Node flavor is required";

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    clusterActions.saveCluster(cluster).then(() => {
      props.history.push("/clusters");
      toast.success("Cluster saved.");
    });
  }

  return (
    <>
      <h2>Manage Cluster</h2>
      <ClusterForm
        errors={errors}
        cluster={cluster}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageClusterPage;
