import dispatcher from "../appDispatcher";
import * as clusterApi from "../api/clusterApi";
import actionTypes from "./actionTypes";

export function saveCluster(cluster) {
  return clusterApi.saveCluster(cluster).then((savedCluster) => {
    // Hey dispatcher, go tell all the stores that a cluster was just created.
    dispatcher.dispatch({
      actionType: cluster.id
        ? actionTypes.UPDATE_CLUSTER
        : actionTypes.CREATE_CLUSTER,
      cluster: savedCluster,
    });
  });
}

export function loadClusters() {
  return clusterApi.getClusters().then((clusters) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_CLUSTERS,
      clusters: clusters,
    });
  });
}

export function deleteCluster(id) {
  return clusterApi.deleteCluster(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_CLUSTER,
      id: id,
    });
  });
}
