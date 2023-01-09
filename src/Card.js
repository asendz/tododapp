import "./Card.css"
import { useState, useEffect } from 'react';
import ABI from "./contractABI.json";
import { ethers } from "ethers";



function Card(props) {

    const [checked, setChecked] = useState(props.done);

    const toggle = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x7067516a3F9d4D7915094684Fe71a0A02e6CD107", ABI, signer);

        const toggleContract = await contract.toggleTask(props.id);

        const receipt = await toggleContract.wait();
        if (receipt.confirmation > 0)
            setChecked(!checked);

    }

    return (
        <div className="ToDoItem">
            <p>{props.Name}</p>
            <input onClick={toggle} type="checkbox" checked={checked} />
        </div>
    );
}

export default Card;