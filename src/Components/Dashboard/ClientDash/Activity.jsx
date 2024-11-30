import React from 'react';
import moment from 'moment'; 

const Activity = ({ activities, filters }) => {
  const { company, state, branch, priority, area, date } = filters;

  const filteredData = activities.filter((row) => {
      if (company && row.company !== company) return false;
      if (state && row.state !== state) return false;
      if (branch && row.branch !== branch) return false;
      if (priority && row.priority !== priority) return false;
      if (area && row.area !== area) return false;

      if (date && date.length === 2) {
          const [startDate, endDate] = date;
          const rowdate = moment(row.date, 'DD-MM-YYYY');
          if (!rowdate.isBetween(moment(startDate), moment(endDate), 'day', '[]')) {
              return false;
          }
      }

      return true;
  });
  return (
    <div className="p-4 bg-white rounded-lg border mt-4 mb-4 border-bordergray">
      <h3 className="font-bold mb-4">Upcoming Activity</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-bordergray">
          <thead>
            <tr className="bg-black text-white">
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">State</th>
              <th className="py-2 px-4 border-b">Branch</th>
              <th className="py-2 px-4 border-b">Activity</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Data is not available</td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.SNO} className="text-center border-b border-bordergray hover:bg-gray-100">
                  <td className="py-2 px-4">{row.SNO}</td>
                  <td className="py-2 px-4">{row.state}</td>
                  <td className="py-2 px-4">{row.branch}</td>
                  <td className="py-2 px-4">{row.activity}</td>
                  <td className="py-2 px-4">{row.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activity;
