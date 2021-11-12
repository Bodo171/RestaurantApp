import React from "react";
import {FoodItem} from "../../model/FoodItem";
import Service from "../../service/Service";
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
    render() {
        const item = this.props.item;
        return <tr>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>Price {item.price} </td>
                <td><button onClick={this.onDelete} className="btn">Delete</button></td>
            </tr>
    }
}

