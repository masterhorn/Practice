import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/clusters/";

export function getClusters() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getClusterBySlug(slug) {
  return fetch(baseUrl + "?slug=" + slug)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then((clusters) => {
        if (clusters.length !== 1)
          throw new Error("Cluster not found: " + slug);
        return clusters[0]; // should only find one cluster for a given slug, so return it.
      });
    })
    .catch(handleError);
}

export function saveCluster(cluster) {
  return fetch(baseUrl + (cluster.id || ""), {
    method: cluster.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...cluster,
      // Parse templateId to a number (in case it was sent as a string).
      templateId: parseInt(cluster.templateId, 10),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCluster(clusterId) {
  return fetch(baseUrl + clusterId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
