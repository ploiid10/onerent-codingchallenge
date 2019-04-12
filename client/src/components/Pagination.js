/* eslint-disable immutable/no-mutation */
import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({onPaginate,paginate : {hasNextPage, hasPreviousPage}})=>{
    return (
        <div className='btn-group float-right'>
           <button className='btn btn-sm btn-outline-secondary' disabled={!hasPreviousPage} onClick={() => { onPaginate("Previous") }}>Previous</button>
            <button className='btn btn-sm btn-outline-secondary' disabled={!hasNextPage} onClick={() => { onPaginate("Next") }}>Next</button>
           </div>
    )
}

Pagination.propTypes = {
    hasNextPage : PropTypes.bool,
    hasPreviousPage : PropTypes.bool
}

export default Pagination;