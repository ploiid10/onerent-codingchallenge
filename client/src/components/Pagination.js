import React from 'react';
import PropTypes from 'prop-types';
const Pagination = (props)=>{
const {onPaginate} = props;
const {paginate} = props;
paginate.propTypes = {
    offset : PropTypes.number,
    limit : PropTypes.number,
    length : PropTypes.number
}
console.log(paginate);
    return (
        <div className='btn-group float-right'>
           <button className='btn btn-sm btn-outline-secondary' disabled={(paginate.offset === 0)} onClick={() => { onPaginate(-5) }}>Previous</button>
            <button className='btn btn-sm btn-outline-secondary' disabled={(paginate.length<=paginate.limit)} onClick={() => { onPaginate(5) }}>Next</button>
        </div>
    )
}
export default Pagination;