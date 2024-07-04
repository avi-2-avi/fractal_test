export const Table = ({ columns, data }) => {
    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} style={{ textAlign: "center", padding: "8px", borderBottom: "1px solid #ddd" }}>
                            {column.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} style={{ textAlign: "center", padding: "8px", borderBottom: "1px solid #ddd" }}>
                                {column.render ? column.render(row) : row[column.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};