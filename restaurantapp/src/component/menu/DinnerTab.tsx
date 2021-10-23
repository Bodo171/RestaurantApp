import { FoodItem } from "../../model/FoodItem";
import FoodBox from "./FoodBox";


export default function DinnerTab(props: {items: Array<FoodItem>}){
    const items = props.items.map(item => <FoodBox item={item} key={item.name}/>);

    return (
        <section className="dinner-menu">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="dinner-menu-content">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="left-image">
                                        <img src="img/dinner_menu.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <h2>Cină</h2>
                                    <div id="owl-dinner" className="owl-carousel owl-theme">
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