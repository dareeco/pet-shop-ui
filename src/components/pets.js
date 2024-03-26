import React, { useEffect, useState } from "react";

function Pets() {
  const [petsData, setPetsData] = useState([]); //In the state we will store the fetched data

  useEffect(() => {
    fetchData();
  }, []); //fetch data when the component mounts

  const fetchData = async () => {
    try {
      //Getting the data
      const response = await fetch("http://localhost:8080/pet");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPetsData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pets;
