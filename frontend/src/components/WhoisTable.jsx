function WhoisTable({ data, dataType }) {
    const domainHeaders = [
      'Domain Name',
      'Registrar',
      'Registration Date',
      'Expiration Date',
      'Estimated Domain Age',
      'Hostnames'
    ];
    const contactHeaders = [
      'Registrant Name',
      'Technical Contact Name',
      'Administrative Contact Name',
      'Contact Email'
    ];
    const headers = dataType === 'domain' ? domainHeaders : contactHeaders;
  
    return (
      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              {headers.map((header) => (
                <th key={header} className="p-3 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              {headers.map((header) => (
                <td key={header} className="p-3">
                  {data[header] || 'N/A'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  export default WhoisTable;