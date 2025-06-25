// import React, { useState } from 'react';
// import { Link, useLoaderData } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const AllPlants = () => {
//   const loadedPlants = useLoaderData();
//   const [plants, setPlants] = useState(loadedPlants);

//   const handleDelete = (_id) => {
//     console.log(_id);

//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       console.log(result.isConfirmed)
//       if (result.isConfirmed) {
      


//         // start deleting the plant
//         fetch(`https://tree-plant-server.vercel.app/plants/${_id}`, {
//           method: 'DELETE'
//         })
//           .then(res => res.json())
//           .then(data => {
//             if (data.deletedCount) {
//               Swal.fire({
//                 title: "Deleted!",
//                 text: "Your Plant has been deleted.",
//                 icon: "success"
//               });

//             //   remove the plant from the state
//               const remainingPlants = plants.filter(plant => plant._id !== _id);
//               setPlants(remainingPlants);
//             }
//           })
//       }
//     });
//   }

//   return (
//     <div className="max-w-6xl mx-auto mt-10 px-4">
//       <h2 className="text-3xl font-bold mb-6 text-green-900 text-center">
//         All Plants
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-green-300 text-green-900">
//           <thead className="bg-green-200">
//             <tr>
//               <th className="py-3 px-4 text-left">#</th>
//               <th className="py-3 px-4 text-left">Plant Name</th>
//               <th className="py-3 px-4 text-left">Category</th>
//               <th className="py-3 px-4 text-left">Watering Frequency</th>
//               <th className="py-3 px-4 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {plants.map((plant, index) => (
//               <tr key={plant._id} className="border-t hover:bg-green-50">
//                 <td className="py-3 px-4">{index + 1}</td>
//                 <td className="py-3 px-4">{plant.plantName}</td>
//                 <td className="py-3 px-4 capitalize">{plant.category}</td>
//                 <td className="py-3 px-4">{plant.wateringFrequency}</td>
//                 <td className="py-3 px-4 space-x-2">
//                   <Link
//                     to={`/plants/${plant._id}`}
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                   >
//                     View Details
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(plant._id)}
//                     className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllPlants;



import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllPlants = () => {
  const loadedPlants = useLoaderData();
  const [plants, setPlants] = useState(loadedPlants);
  const [sortOption, setSortOption] = useState('');

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://tree-plant-server.vercel.app/plants/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Plant has been deleted.",
                icon: "success"
              });
              const remainingPlants = plants.filter(plant => plant._id !== _id);
              setPlants(remainingPlants);
            }
          });
      }
    });
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    let sortedPlants = [...plants];

    if (selectedOption === 'nextWateringDate') {
      sortedPlants.sort((a, b) => new Date(a.nextWateringDate) - new Date(b.nextWateringDate));
    } else if (selectedOption === 'careLevel') {
      const levelOrder = { easy: 1, moderate: 2, difficult: 3 };
      sortedPlants.sort((a, b) => levelOrder[a.careLevel] - levelOrder[b.careLevel]);
    }

    setPlants(sortedPlants);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-green-900 text-center">
        All Plants
      </h2>

      {/* Sorting Dropdown */}
      <div className="mb-6 flex justify-end">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="px-4 py-2 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Sort By</option>
          <option value="nextWateringDate">Next Watering Date</option>
          <option value="careLevel">Care Level</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-300 text-green-900">
          <thead className="bg-green-200">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Plant Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Watering Frequency</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, index) => (
              <tr key={plant._id} className="border-t hover:bg-green-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{plant.plantName}</td>
                <td className="py-3 px-4 capitalize">{plant.category}</td>
                <td className="py-3 px-4">{plant.wateringFrequency}</td>
                <td className="py-3 px-4 space-x-2">
                  <Link
                    to={`/plants/${plant._id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(plant._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPlants;


