import "@/css/DataCard.css";
// The formating of each file in the Data table

type Props = {
  filteredData: MCAPFileInformation[];
};

function DataCard({ filteredData }: Props) {
  return (
    <>
      {filteredData.map((item) => (
        <div className="card-container" key={item.id}>
          <div className="card">
            <div className="card-header">
              <h3>{item.mcap_file_name}</h3>
              <p className="file-id">ID: {item.id}</p>{" "}
              {/* Now placed directly under the file name */}
            </div>
            <div className="card-content">
              <p>
                <strong>Matlab File Name:</strong> {item.matlab_file_name}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Date:</strong> {item.date}
              </p>
              <p>
                <strong>Event Type:</strong> {item.event_type || "N/A"}
              </p>
              <p>
                <strong>Notes:</strong> {item.notes || "No notes available"}
              </p>
            </div>
            <div className="card-footer">
              <p>
                {/* <a href={item.mcap_path}>View MCAP File</a>  LINK TO VIEW MAYBE? */}
                <p>
                  <strong>MCAP path:</strong> {item.mcap_path}
                </p>
              </p>
              <p>
                <p>
                  <strong>Mat path:</strong> {item.mcap_path}
                </p>
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default DataCard;
