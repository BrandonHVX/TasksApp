import React from 'react';

const Pagination = props => {
  return(
    <div className="btn-toolbar" role="toolbar">
      <div className="btn-group mr-2" role="group">
        <button
          className="btn btn-info"
          onClick={ (e) => props.changePage(1) }
          >
          First
        </button>
      </div>
      <div className="btn-group mr-2" role="group">
        <button
          className="btn btn-light"
          disabled={ props.page === 1}
          onClick={ (e) => props.changePage(props.page - 1)}
          >
          Prev
        </button>
        <button
          className="btn btn-light"
          disabled={ props.page === props.totalPages }
          onClick={ (e) => props.changePage(props.page + 1)}

          >
          Next
        </button>
      </div>
      <div className="btn-group mr-2" role="group">
        <button
          className="btn btn-info"
          onClick={ (e) => props.changePage(props.totalPages) }
          >
          Last
        </button>
      </div>
      <div className="btn-group ml-auto" role="group">
        <div style={{margin: '.375rem'}}>
          Page {props.page} of {props.totalPages}
        </div>
      </div>
    </div>

  )
}

export default Pagination;
