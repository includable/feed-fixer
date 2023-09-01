import React from "react";
import useSWR from "swr";

const Preview = ({ url, rules }) => {
  const { data, isLoading } = useSWR([url, rules], async () => {
    const res = await fetch(
      `/preview?url=${url}&rules=${encodeURIComponent(JSON.stringify(rules))}`
    );
    return res.json();
  });
  console.log(data);
  console.log(url);

  return (
    <div className="bg-gray-100 p-6 lg:p-16 prose lg:w-[35%] overflow-auto">
      <h3>Preview</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : data?.error ? (
        <p className="text-red-500">{data.error}</p>
      ) : (
        <p>{data?.items?.length || 0} matches</p>
      )}
      {data?.items?.slice(0, 10).map((item) => (
        <article key={item.id}>
          <h4>
            <a href={item.url} target="_blank">
              {item.title}
            </a>
          </h4>
          <p>{item.summary}</p>
        </article>
      ))}
    </div>
  );
};

export default Preview;
