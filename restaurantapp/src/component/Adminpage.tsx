import React from "react";
import Service from "../service/Service";
import {Menu} from "../model/Menu";
import CreateOwlCarousels from "../scripts/owlcarousel";
import {DishType, dishTypeFromString, emptyMenu} from "../util/util";
import ItemList from "./admin/ItemList";
import DisplaySelect from "./admin/DisplaySelect";

type State = {
    menu: Menu;
    fetching: boolean;
    sending: boolean;
    onDisplay: DishType;
}
export default class Adminpage extends React.Component<{},State>{
    constructor(props:any){
        super(props);

        this.state = {
            sending: false,
            menu: emptyMenu(),
            fetching: true,
            onDisplay: DishType.BREAKFAST,
        }
        this.onLogout = this.onLogout.bind(this);
        this.onDisplayChange = this.onDisplayChange.bind(this);
    }

    componentDidMount() {
        Service.getMenu().then((menu:Menu) => {
            this.setState({...this.state, menu: menu, fetching: false});
            CreateOwlCarousels();
        }).catch((error:any) => {
            alert(error);
        });
    }

    onDisplayChange(onDisplayStr: string){
        this.setState(
            {...this.state, onDisplay: dishTypeFromString(onDisplayStr)}
        )
    }
    onLogout(event: any){
        this.setState({...this.state, sending: true});
        Service.logout()
            .then((success) => {
                window.location.href = '';
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.setState({...this.state, sending: false});
            });

    }

    getCurrentMenu(){
        const menu = this.state.menu;
        switch(this.state.onDisplay){
            case DishType.BREAKFAST:
                return menu.breakfast;
            case DishType.LUNCH:
                return menu.lunch;
            case DishType.DINNER:
                return menu.dinner;
        }
    }

    render(){
        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: 'center'}}>
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                    <DisplaySelect defaultValue={this.state.onDisplay} onChange={(display: string) => {this.onDisplayChange(display);}}/>
                    <button disabled={this.state.sending} className="btn" onClick={this.onLogout}>Logout</button>
                    <ItemList items={this.getCurrentMenu()}/>
                </div>
            </div>
        )
    }
}
