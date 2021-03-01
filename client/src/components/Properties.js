import React from 'react';
import PropTypes from 'prop-types';
const Properties = ({property}) => {
    property.propTypes = {
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
    return(
        <div className="card card-body mt-2">
            <div className="row">
                <div className="col-md-9 text-left">
                    <p>Street : {property.street}</p>                
                    <p></p> City : {property.city}&nbsp; State : {property.state}&nbsp; Zip : {property.zip} <p></p>   
                    <p>Rent : {property.rent}</p> 
                    <p>Owner : {property.user.lastName},&nbsp; {property.user.firstName}</p>
                </div>
            </div>
        </div>
    )
}

export default Properties;