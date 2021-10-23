import React from "react";
import { Menu } from "../model/Menu";
import CreateOwlCarousels from "../scripts/owlcarousel";
import BreakfastTab from "./menu/BreakfastTab";
import LunchTab from "./menu/LunchTab";
import DinnerTab from "./menu/DinnerTab";
import Loader from "react-loader-spinner";
import BookTable from "./BookTable";
import Service from "../service/Service";

type State = {
    menu: Menu;
    fetching: boolean;
};

export default class MenuPage extends React.Component<{},State>{
    constructor(props: any){
        super(props);

        this.state = {
            fetching: true,
            menu: { breakfast: [], lunch: [], dinner: [] }
        };
    }

    componentDidMount(){
        Service.getMenu().then((menu:Menu) => {
            this.setState({menu: menu, fetching: false});
            CreateOwlCarousels();
        }).catch((error:any) => {
            alert(error);
        });
    }

    render(){
        if (this.state.fetching) return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <Loader
                    type="ThreeDots"
                    color="#121212"
                    height={100}
                    width={100}
                />
            </div>
        );
        return (
            <>
                <BreakfastTab items={this.state.menu.breakfast}/>
                <LunchTab items={this.state.menu.lunch}/>
                <DinnerTab items={this.state.menu.dinner}/>

                <BookTable/>
            </>
        );
    }
}