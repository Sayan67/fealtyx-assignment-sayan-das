import React from "react";

function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>
    <h1>Work Item: {id}</h1>
    <p>This is the details page for work item with ID: {id}</p>
  </div>;
}

export default page;
