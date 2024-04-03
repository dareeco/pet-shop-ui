import React, { useEffect, useState, useCallback } from "react";

function Users() {
  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = useState(0);
  const [usersLength, setUsersLength] = useState();
  const [usersPerPage, setUsersPerPage] = useState(5);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/user/pageable?page=${page}&size=${usersPerPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.log("Error occured, here's the details: ", error);
    }
  }, [page, usersPerPage]);

  const getListLength = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/length`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const length = await response.json();
      setUsersLength(length);
    } catch (error) {
      console.error("Error fetching length: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    getListLength();
  }, [fetchData]); //We need it here - you can't use fetchData before initialization

  const goToPreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    } else {
      alert("No more data to display on previous page :D");
    }
  };

  const goToNextPage = () => {
    if (page < Math.ceil(usersLength / usersPerPage) - 1) {
      setPage(page + 1);
    } else {
      alert("No more data to display on next page :D");
    }
  };
  return (
    <div>
      <div class="w-1/2 mx-auto flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead class="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      First Name
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Last Name
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Budget
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((user) => (
                    <tr
                      key={user.id}
                      class="border-b border-neutral-200 dark:border-white/10"
                    >
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {user.firstName}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {user.lastName}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {user.email}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {user.budget}$
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center  mt-3">
                <button
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-200 dark:hover:text-black"
                  onClick={goToPreviousPage}
                >
                  Previous
                </button>

                <div>
                  <button
                    className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-200 dark:hover:text-black"
                    onClick={goToNextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="w-1/8 float-right" style={{ marginTop: "-4.5%" }}>
                <select
                  onChange={(e) => setUsersPerPage(parseInt(e.target.value))}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
