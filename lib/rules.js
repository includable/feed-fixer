export const ruleTypes = [
  {
    id: "exclude",
    title: "Exclude items that contain title text",
    fields: [
      {
        id: "q",
        title: "search keyword",
      },
    ],
    condition: (item, fields) => {
      return !item.title.toLowerCase().includes(fields.q.toLowerCase());
    },
  },
  {
    id: "exclude-body",
    title: "Exclude items that contain body text",
    fields: [
      {
        id: "q",
        title: "search keyword",
      },
    ],
    condition: (item, fields) => {
      return !item.description.toLowerCase().includes(fields.q.toLowerCase());
    },
  },
  {
    id: "include",
    title: "Include items that contain title text",
    fields: [
      {
        id: "q",
        title: "search keyword",
      },
    ],
    condition: (item, fields) => {
      return item.title.toLowerCase().includes(fields.q.toLowerCase());
    },
  },
  {
    id: "include-body",
    title: "Include items that contain body text",
    fields: [
      {
        id: "q",
        title: "search keyword",
      },
    ],
    condition: (item, fields) => {
      return item.description.toLowerCase().includes(fields.q.toLowerCase());
    },
  },
];
