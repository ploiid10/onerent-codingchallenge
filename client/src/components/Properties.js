import React from 'react';
import PropTypes from 'prop-types';
const Properties = ({node : {street, city, state, zip, rent, user}}) => {
    return(
        <div className="card card-body mt-2">
            <div className="row">
                <div className="col-md-9 text-left">
                    <p>Street : {street}</p>                
                    <p></p> City : {city}&nbsp; State : {state}&nbsp; Zip : {zip} <p></p>   
                    <p>Rent : {rent}</p> 
                    <p>Owner : {user.lastName},&nbsp; {user.firstName}</p>
                </div>
            </div>
        </div>
    )
}
// eslint-disable-next-line immutable/no-mutation
Properties.propTypes = {
    street : PropTypes.string,
    city : PropTypes.string,
    zip :  PropTypes.string,
    state : PropTypes.string,
    user :  PropTypes.shape({
        firstName : PropTypes.string,
        lastName : PropTypes.string
    }),
    rent : PropTypes.number
}
export default Properties;