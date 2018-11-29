import React from 'react';

const TableRow = props => {
  return(
    <tr>
      <td>
        <a href={`/tasks/${props.task.id}/sub_tasks`}>
          { props.task.description }
        </a>
      </td>
      <td>
        { props.task.due_date }
      </td>
      <td>
        <span className="float-right">
          <button
            className="btn btn-secondary mr-1"
            onClick={ (e) => { props.updateTask(props.task) } }
          >
            { props.task.completed ? "Mark Incomplete" : "Mark Completed" }
          </button>
          <button
            className="btn btn-danger"
            onClick={ (e) => { props.deleteTask(props.task) }  }
          >
            Delete
          </button>
        </span>
      </td>
    </tr>
  );
}

export default TableRow;
