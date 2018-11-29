import React from 'react';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import dateFns from 'date-fns';

const CalendarModal = props => {
  const formattedDate = dateFns.format(props.selectedDate, 'YYYY-MM-DD')
  const tasks = props.tasks[formattedDate] || [];
  return (
    <Modal isOpen={props.modalOpen} toggle={props.toggleModal}>
      <ModalHeader toggle={props.toggleModal}>
        { dateFns.format(props.selectedDate, 'dddd, MMMM Do') }
      </ModalHeader>
      <ModalBody>
        <ul>
          {
            tasks.map((task) => {
              return(
                <li>
                  <a href={`/tasks/${task.id}/sub_tasks`}>
                    {
                      task.completed ? <s>{task.description}</s> : task.description
                    }
                  </a>
                </li>
              )
            })
          }
          {
            tasks.length === 0 &&
            <p>No tasks due today</p>
          }
        </ul>
      </ModalBody>
    </Modal>
  );
}

export default CalendarModal;
