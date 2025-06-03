// const LocationSearchBox = ({ setPosition }) => {
//   const [query, setQuery] = useState("");

//   const handleSearch = async () => {
//     if (!query) return;

//     try {
//       const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}`);
//       const data = await res.json();
//       if (data.features && data.features.length > 0) {
//         const [lng, lat] = data.features[0].geometry.coordinates;
//         setPosition([lat, lng]);
//       } else {
//         alert("No results found. Try being more general.");
//       }
//     } catch (error) {
//       console.error("Search error:", error);
//     }
//   };

//   return (
//     <div className="mb-3">
//       <input
//         type="text"
//         value={query}
//         placeholder="Search location..."
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") handleSearch();
//         }}
//         className="w-full p-2 border rounded"
//       />
//       <button
//         type="button"
//         onClick={handleSearch}
//         className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Search
//       </button>
//     </div>
//   );
// };
