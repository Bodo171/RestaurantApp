import { FoodItem } from "../../model/FoodItem";
import FoodBox from "./FoodBox";


export default function LunchTab(props: {items: Array<FoodItem>}){
    const items = props.items.map(item => <FoodBox item={item} key={item.id}/>);

    return (
        <section className="lunch-menu">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="lunch-menu-content">
                            <div className="row">
                                <div className="col-md-7">
                                    <h2>Prânz</h2>
                                    <div id="owl-lunch" className="owl-carousel owl-theme">
                                        { items }
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="left-image">
                                        <img src="img/lunch_menu.jpg" alt="" />
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
