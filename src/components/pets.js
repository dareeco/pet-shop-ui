import React, { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.css";

function Pets() {
  const [petsData, setPetsData] = useState([]); //In the state we will store the fetched data
  const [page, setPage] = useState(0);
  const [petsLength, setPetsLength] = useState();
  const [petsPerPage, setPetsPerPage] = useState(5); //default value from the dropdown will be 1

  const fetchData = useCallback(async () => {
    try {
      //Getting the data
      const response = await fetch(
        `http://localhost:8080/pet/pageable?page=${page}&size=${petsPerPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPetsData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [page, petsPerPage]);

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
    if (page < Math.ceil(petsLength / petsPerPage) - 1) {
      //Math function because we only have whole number of pages
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

              <div className="flex justify-center mt-3">
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
                  onChange={(e) => setPetsPerPage(parseInt(e.target.value))}
                >
                  {/*we must do it onChange otherwise it will be stuck in
                  re-rendering loop and throw errors */}
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

export default Pets;
