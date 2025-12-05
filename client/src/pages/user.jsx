import React, { useEffect, useRef, useState } from 'react';
import UserCard from '../components/user-card';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';

const fetchItems = async ({ pageParam = 1 }) => {
  const res = await fetch(`http://localhost:3000/users?page=${pageParam}&limit=4`);
  return res.json();
};

const fetchNationalities = async () => {
  const res = await fetch(`http://localhost:3000/nationalities`);
  return res.json();
};

const fetchHobbies = async () => {
  const res = await fetch(`http://localhost:3000/hobbies`);
  return res.json();
};

function UserPage() {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['data'],
    queryFn: fetchItems,
    getNextPageParam: (lastPage, allPages) => lastPage.nextPageParam, // Or similar logic
  });

  const allItems = data?.pages.flatMap(page => page.data) || [];

  const parentRef = useRef();
  const [nationalitiesList, setNationalitiesList] = useState([]);
  const [hobbiesList, setHobbiesList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allItems.length + 1 : allItems.length, // Add a placeholder for "load more"
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Estimated height of each item
  });


  useEffect(() => {
      const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

      if (!lastItem) {
        return;
      }

      if (
        lastItem.index >= allItems.length - 1 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    }, [rowVirtualizer.getVirtualItems(), hasNextPage, isFetchingNextPage, fetchNextPage, allItems.length]);

    useEffect(() => {
      fetchNationalities().then(n => {
        setNationalitiesList(n.nationalities);
      });

      fetchHobbies().then(h => {
        setHobbiesList(h.hobbies);
      });
    },[])

  return (
    <>
      <aside className="w-full lg:w-1/4 bg-gray-200 p-4">
        {/* <!-- Sidebar content --> */}
        <h3 class="font-bold mb-2">Filter Users</h3>
        <div class="mb-6">
          <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input type="text" id="search" placeholder="Search by name..."
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div class="mb-6">
          <label for="category" class="block text-sm font-medium text-gray-700">Nationality</label>
          <select id="nationality" name="nationality" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            { nationalitiesList && nationalitiesList.map(n => (
              <option value={n}>{n}</option>
            ))
            }
          </select>
        </div>
        <div class="mb-4">
          <label for="category" class="block text-sm font-medium text-gray-700">Hobby</label>
          <select id="hobby" name="hobby" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            { hobbiesList && hobbiesList.map(h => (
              <option value={h}>{h}</option>
            ))
            }
          </select>
        </div>
      </aside>

      <main className="flex-1 p-4">
        {/* <!-- Main content for the current page --> */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Profiles</h1>
          <div
            ref={parentRef}
            style={{
              height: `500px`, // Fixed height for scrollable container
              overflow: 'auto',
            }}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const isLoaderRow = virtualRow.index > allItems.length - 1;
                const item = allItems[virtualRow.index];
            return(
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {isLoaderRow ? (
                      isFetchingNextPage ? 'Loading more...' : 'Load More'
                    ) : (
                      <UserCard user={item}/>
                    )}
              </div>
            );
          })}
          </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserPage;