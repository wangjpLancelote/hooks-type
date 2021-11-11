import React from 'react';
import { useHistory } from "react-router-dom";
 function Herf(props: any){
    const history = useHistory();
    function herfPage(){
        history.push(props.path)
    }
    return (
        <span onClick={herfPage}>{ props.icon } {props.name}</span>
    )
}
export default Herf;