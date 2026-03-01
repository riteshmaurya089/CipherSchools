// import React from 'react';

// const SchemaViewer = ({ tables }) => {
//   // ✅ Prevent crash if tables not loaded yet
//   if (!Array.isArray(tables) || tables.length === 0) {
//     return (
//       <div className="schema-viewer">
//         <h3 className="schema-viewer__title">Available Tables</h3>
//         <p>No schema information available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="schema-viewer">
//       <h3 className="schema-viewer__title">Available Tables</h3>

//       {tables.map((table, tableIndex) => {
//         const schema = table.schema || table.columns || [];
//         const sampleData = table.sampleData || table.sample || [];

//         return (
//           <div
//             key={table.name || tableIndex}
//             className="schema-table"
//           >
//             <h4 className="schema-table__name">{table.name}</h4>

//             {/* Table Structure */}
//             <table className="schema-table__structure">
//               <thead>
//                 <tr>
//                   <th>Column</th>
//                   <th>Type</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {schema.map((col, colIndex) => (
//                   <tr key={col.name || colIndex}>
//                     <td>{col.name}</td>
//                     <td>{col.type}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Sample Data */}
//             {sampleData.length > 0 && (
//               <details className="schema-table__sample">
//                 <summary>View Sample Data</summary>

//                 <div className="sample-table-wrapper">
//                   <table className="sample-data-table">
//                     <thead>
//                       <tr>
//                         {schema.map((col, index) => (
//                           <th key={col.name || index}>{col.name}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {sampleData.slice(0, 3).map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                           {schema.map((col, colIndex) => (
//                             <td key={`${rowIndex}-${colIndex}`}>
//                               {row[col.name] !== null &&
//                               row[col.name] !== undefined
//                                 ? String(row[col.name])
//                                 : 'NULL'}
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </details>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default SchemaViewer;


import React from 'react';

const SchemaViewer = ({ tables }) => {
  if (!Array.isArray(tables) || tables.length === 0) {
    return (
      <div className="schema-viewer">
        <h3 className="schema-viewer__title">Available Tables</h3>
        <p>No schema information available.</p>
      </div>
    );
  }

  return (
    <div className="schema-viewer">
      <h3 className="schema-viewer__title">Available Tables</h3>

      {tables.map((table, tableIndex) => {
        const schema = table.schema || [];
        const sampleData = table.sampleData || [];

        return (
          <div
            key={table.tableName || tableIndex}
            className="schema-table"
          >
            <h4 className="schema-table__name">
              {table.tableName}
            </h4>

            <table className="schema-table__structure">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {schema.map((col, colIndex) => (
                  <tr key={col.name || colIndex}>
                    <td>{col.name}</td>
                    <td>{col.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {sampleData.length > 0 && (
              <details className="schema-table__sample">
                <summary>View Sample Data</summary>

                <div className="sample-table-wrapper">
                  <table className="sample-data-table">
                    <thead>
                      <tr>
                        {schema.map((col, index) => (
                          <th key={col.name || index}>{col.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.slice(0, 3).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {schema.map((col, colIndex) => (
                            <td key={`${rowIndex}-${colIndex}`}>
                              {row[col.name] !== null &&
                              row[col.name] !== undefined
                                ? String(row[col.name])
                                : 'NULL'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SchemaViewer;