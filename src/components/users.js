import React, { useEffect, useState } from "react";

function Users() {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/user");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.log("Error occured, here's the details: ", error);
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
                  {/* <tr class="border-b border-neutral-200 dark:border-white/10"></tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
