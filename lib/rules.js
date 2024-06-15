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
      return !fields.q || !item.title.toLowerCase().includes(fields.q.toLowerCase());
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
      return !fields.q || !item.description.toLowerCase().includes(fields.q.toLowerCase());
    },
  },
  {
    id: "exclude-link",
    title: "Exclude items that contain link text",
    fields: [
      {
        id: "q",
        title: "link fragment",
      },
    ],
    condition: (item, fields) => {
      return !fields.q || !item.link.toLowerCase().includes(fields.q.toLowerCase());
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
      return !fields.q || item.title.toLowerCase().includes(fields.q.toLowerCase());
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
      return !fields.q || item.description.toLowerCase().includes(fields.q.toLowerCase());
    },
  },
  {
    id: "exclude-count",
    title: "Limit item count to first",
    fields: [
    	{
      	id: "limt",
        title: "count limit",
      }
    ],
    condition: (item, fields, addedItemCount) => {
    	const limit = Number(fields.limit);
      return !limit || addedItemCount < limit; 
    },
  },
];
