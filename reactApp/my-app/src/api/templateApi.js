import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/templates/";

export function getTemplates() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveTemplate(template) {
  return fetch(baseUrl + (template.id || ""), {
    method: template.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(template),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTemplate(templateId) {
  return fetch(baseUrl + templateId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
