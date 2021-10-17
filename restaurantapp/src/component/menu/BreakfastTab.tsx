import { FoodItem } from "../../model/FoodItem";
import FoodBox from "./FoodBox";


export default function BreakfastTab(props: {items: Array<FoodItem>}){
    const items = props.items.map(item => <FoodBox item={item} key={item.name}/>);

    return (
        <section className="breakfast-menu">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="breakfast-menu-content">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="left-image">
                                        <img src="img/breakfast_menu.jpg" alt="Breakfast" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <h2>Mic dejun</h2>
                                    <div id="owl-breakfast" className="owl-carousel owl-theme">
                                        { items }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}