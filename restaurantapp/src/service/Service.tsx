import { Menu } from "../model/Menu";
import { User } from "../model/User";
import {FoodItem} from "../model/FoodItem";

export default class Service{
    static apiUri = 'https://restaurant-bckend.herokuapp.com/';

    static getMenu = () => {
        return new Promise((
            resolve: (menu: Menu) => void,
            reject: (error: any) => void
        ) => {
            const getDish: (dishJson: any) => FoodItem = (dishJson) => {
                return {
                    id: dishJson.id,
                    name: dishJson.attributes.name,
                    description: dishJson.attributes.description,
                    price: dishJson.attributes.price,
                    image: dishJson.attributes.image,
                }
            }
            fetch(this.apiUri + 'dishes', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            }).then((response) =>{
                    response.json().then(
                        (menuJson) => {
                            resolve({
                                breakfast: menuJson.breakfast.data.map(getDish),
                                lunch: menuJson.lunch.data.map(getDish),
                                dinner: menuJson.dinner.data.map(getDish),
                            });
                        }
                    )
                }
            ).catch((error) => {
                reject('Internal server error' + error.status);
            });
        });
    }

    static addMenuItem = (data: {name: string, description: string, price:number}) => {
        return new Promise((
            resolve: (success: null) => void,
            reject: (error: any) => void
        ) => {})
    }

    static reserveTable = (data: {name: string, day: string, hour: string, persons: number, phone: string}) => {
        return new Promise((
            resolve: (result: null) => void,
            reject: (error: any) => void
        ) => {
            setTimeout(() => {
                if (data.name === 'fail') reject('Cererea ta nu s-a putut procesa. Incearca mai tarziu!');
                else resolve(null);
            }, 2000);
        });
    }

    static login = (data: {email: string, password: string}) => {
        return new Promise((
            resolve: (success: null) => void,
            reject: (error: any) => void
        ) => {
            fetch(this.apiUri + 'users/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                //credentials: 'include',
                body: JSON.stringify({user: data})
            })
            .then((response) => {
                if (response.status === 200){
                    let jwt = response.headers?.get('Authorization')?.replace('Bearer ', '');
                    if (jwt !== undefined && jwt !== ''){
                        response.json().then((json) => {
                            let user:User = {
                                id: Number(json.data.id) || 0,
                                type: json.data.type || 'unknown',
                                attributes: {
                                    email: json.data.attributes.email || ''
                                }
                            };
                            localStorage.setItem('jwt', jwt||'');
                            localStorage.setItem('user', JSON.stringify(user));
                            resolve(null);
                        });
                    }else{
                        console.error('Authorization failed: missing or invalid jwt key!');
                        reject('404: Authorization failed! Try again or contact the administrator!');
                    }
                } else if (response.status === 401){
                    reject('Wrong credentials!');
                } else {
                    reject('Authentification failed: ' + response.status);
                }
            })
            .catch((error: any) => reject(error));
            
        });
    }

    static logout = () => {
        return new Promise((
            resolve: (success: null) => void,
            reject: (error: any) => void
        ) => {
            fetch(this.apiUri + 'users/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '' + localStorage.getItem('jwt')
                },
            })
            .then((response) => {
                if (response.status === 200){
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('user');
                    resolve(null);
                }else{
                    reject(response.statusText);
                }
            })
            .catch((error) => {
                reject(error);
            });

            
        });
    }
}
