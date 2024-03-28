import React, { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.css";

function Pets() {
  const [petsData, setPetsData] = useState([]); //In the state we will store the fetched data
  const [page, setPage] = useState(0);
  const [petsLength, setPetsLength] = useState();

  const fetchData = useCallback(async () => {
    try {
      //Getting the data
      const response = await fetch(
        `http://localhost:8080/pet/pageable?page=${page}&size=5`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPetsData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [page]);

  const getListLength = async () => {
    try {
      const response = await fetch(`http://localhost:8080/pet/length`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const length = await response.json();
      setPetsLength(length);
    } catch (error) {
      console.error("Error fetching length: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    getListLength();
  }, [fetchData]); //fetch data when the component mounts -this was before pagination
  //with adding of [page] now we fetching data when the page state changes

  const goToPreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    } else {
      alert("No more data to display on previous page :D");
    }
  };

  const goToNextPage = () => {
    if (page < petsLength / 5 - 1) {
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
                      Name
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Type
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Date of Birth
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {petsData.map((pet) => (
                    <tr
                      key={pet.id}
                      class="border-b border-neutral-200 dark:border-white/10"
                    >
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {pet.name}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {pet.type}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {pet.dateOfBirth}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {pet.price}$
                      </td>
                    </tr>
                  ))}
                  {/* <tr class="border-b border-neutral-200 dark:border-white/10"></tr> */}
                </tbody>
              </table>

              <div class="flex">
                <button
                  onClick={goToPreviousPage}
                  class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>

                <button
                  onClick={goToNextPage}
                  class="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pets;
