import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _clusters = [];

class ClusterStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getClusters() {
    return _clusters;
  }

  getClusterBySlug(slug) {
    return _clusters.find((cluster) => cluster.slug === slug);
  }
}

const store = new ClusterStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_CLUSTER:
      _clusters = _clusters.filter(
        (cluster) => cluster.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    case actionTypes.CREATE_CLUSTER:
      _clusters.push(action.cluster);
      store.emitChange();
      break;
    case actionTypes.UPDATE_CLUSTER:
      _clusters = _clusters.map((cluster) =>
        cluster.id === action.cluster.id ? action.cluster : cluster
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_CLUSTERS:
      _clusters = action.clusters;
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});

export default store;
