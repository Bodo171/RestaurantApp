import React from "react";
import {FoodItem} from "../../model/FoodItem";
import Service from "../../service/Service";
import {Link} from "react-router-dom";
type Props = {
    item: FoodItem;
    updateCallback: () => void;
}
type State = {
    fetching: boolean,
    error: string,
}
export default class Item extends React.Component<Props, State>{
    constructor(props:any){
        super(props);
        this.state = {
            fetching: false,
            error: '',
        }
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }
    onDelete(){
        this.setState({fetching: true, error: ''});
        Service.deleteMenuItem({id: this.props.item.id})
            .catch((error) => {
                this.setState({error: String(error)});
            })
            .finally(() => {
                this.setState({fetching: false});
                this.props.updateCallback();
            });
    }
    onUpdate(){
        window.location.href = `/edit/${this.props.item.id}`;
    }
    render() {
        const item = this.props.item;
        return <tr>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>Price {item.price} </td>
                <td>
                    <button onClick={this.onDelete} className="btn">Delete</button>
<<<<<<< HEAD
                    <button onClick={this.onUpdate} className="btn">Update</button>
=======
                    <Link to={`/edit/${this.props.item.id}`}><button className="btn">Update</button></Link>
>>>>>>> a0b7519262afd9739e135e451c489d74b6693a0c
                </td>
            </tr>
    }
}

