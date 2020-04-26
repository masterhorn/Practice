const clusters = [
  {
    id: 1,
    clusterName: "Test",
    slug: "react-auth0-authentication-security",
    templateId: 1,
    volumeSize: 50,
  },
  {
    id: 2,
    clusterName: "Test2",
    slug: "react-big-picture",
    templateId: 1,
    volumeSize: 50,
  },
  {
    id: 3,
    clusterName: "Test3",
    slug: "react-creating-reusable-components",
    templateId: 1,
    volumeSize: 50,
  },
  {
    id: 4,
    clusterName: "Test4",
    slug: "50-development-environment",
    templateId: 1,
    volumeSize: 50,
  },
  {
    id: 5,
    clusterName: "Test5",
    slug: "react-redux-react-router-es6",
    templateId: 1,
    volumeSize: 50,
  },
  {
    id: 6,
    clusterName: "Test6",
    slug: "react-flux-building-applications",
    templateId: 1,
    volumeSize: 50,
  },
  {
    id: 7,
    clusterName: "Test7",
    slug: "writing-clean-code-humans",
    templateId: 1,
    volumeSize: 50,
  },
  {
    id: 8,
    clusterName: "Test8",
    slug: "architecting-applications-dotnet",
    templateId: 1,
    volumeSize: 50,
  },
  {
    id: 9,
    clusterName: "Test9",
    slug: "career-reboot-for-developer-mind",
    templateId: 1,
    volumeSize: 50,
  },
  {
    id: 10,
    clusterName: "Test10",
    slug: "web-components-shadow-dom",
    templateId: 1,
    volumeSize: 50,
  },
];

const templates = [
  { id: 1, template: "v1.17.3.1" },
  { id: 2, template: "v1.15.7" },
  // { id: 3, template: "v1.17.3.deprecated" },
];

const newCluster = {
  id: null,
  clusterName: "",
  templateId: null,
  volumeSize: null,
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCluster,
  clusters,
  templates,
};
