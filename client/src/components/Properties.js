import React from 'react';

export default function Properties({property :{street, city, state, zip, rent, user}}){
  
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