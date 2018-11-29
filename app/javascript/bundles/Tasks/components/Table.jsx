import React from 'react';
import TableRow from './TableRow';

const Table = props => {
  return(
    <div style={{ height: 320, overflowY: 'scroll' }}>
      <table className="table">
        <tbody>
          {
            props.tasks.map((task) => {
              return(
                <TableRow
                  key={task.id}
                  task={task}
                  {...props}
                />
              );
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table;
