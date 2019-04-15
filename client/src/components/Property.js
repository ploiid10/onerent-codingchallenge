import React from 'react';
import PropTypes from 'prop-types';

const Property = ({node: {street, city, state, zip, rent, user}}) => {
    return(
        <div className="card card-body mt-2">
            <div className="row">
                <div className="col-md-9 text-left">
                    <p>Street : {street}</p>                
                    <p> City : {city}&nbsp; State : {state}&nbsp; Zip : {zip}</p>   
                    <p>Rent : {rent}</p> 
                    <p>Owner : {user.lastName},&nbsp; {user.firstName}</p>
                </div>
            </div>
        </div>
    )
}
// eslint-disable-next-line immutable/no-mutation
Property.propTypes = {
    node : PropTypes.shape({
        street : PropTypes.string.isRequired,
        city : PropTypes.string.isRequired,
        zip :  PropTypes.string.isRequired,
        state : PropTypes.string.isRequired,
        user :  PropTypes.shape({
            firstName : PropTypes.string.isRequired,
            lastName : PropTypes.string.isRequired
        }),
        rent : PropTypes.number.isRequired
    })
}

export default Property;