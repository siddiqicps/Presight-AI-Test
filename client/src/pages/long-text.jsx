import React, { useEffect, useRef, useState } from 'react';


// const fetchLongText = async () => {
//   const res = await fetch(`http://localhost:3000/longText`);
//   return res.json();
// };


function LongTextPage() {

  const [longText, setLongText] = useState('')

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/longText');

    eventSource.onmessage = (event) => {
        // console.log('Reading Data---',event)
        const newData = event.data;
        setLongText(prevData => [...prevData, newData]);
    };

    eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        eventSource.close(); // Close on error to prevent continuous retries
    };

    return () => {
        eventSource.close(); // Clean up on component unmount
    };
  },[])

  return (
    <main className="flex-1 p-4">
        {/* <!-- Main content for the current page --> */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Long Text</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {longText}
        </div>
      </div>
    </main>
  );
}

export default LongTextPage;