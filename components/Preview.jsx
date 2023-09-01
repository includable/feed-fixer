import React from "react";
import useSWR from "swr";

const Preview = ({ url }) => {
  const { data, isLoading } = useSWR(url, async (url) => {
    const res = await fetch(url + "&format=json");
    return res.json();
  });
  console.log(data);
  console.log(url);

  return (
    <div className="bg-gray-100 p-16 prose lg:w-[35%] overflow-auto">
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
