import { Menu } from "../model/Menu";
import { User } from "../model/User";
import {FoodItem} from "../model/FoodItem";

export default class Service{
    static apiUri = 'https://restaurant-bckend.herokuapp.com/';

    static getDish: (dishJson: any) => FoodItem = (dishJson) => {
        return {
            id: dishJson.id,
            name: dishJson.attributes.name,
            description: dishJson.attributes.description,
            price: dishJson.attributes.price,
            image: dishJson.attributes.image,
        }
    }

    static getMenu = () => {
        return new Promise((
            resolve: (menu: Menu) => void,
            reject: (error: any) => void
        ) => {
            fetch(this.apiUri + 'dishes', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            }).then((response) =>{
                    response.json().then(
                        (menuJson) => {
                            resolve({
                                breakfast: menuJson.breakfast.data.map(this.getDish),
                                lunch: menuJson.lunch.data.map(this.getDish),
                                dinner: menuJson.dinner.data.map(this.getDish),
                            });
                        }
                    )
                }
            ).catch((error) => {
                reject('Internal server error' + error.status);
            });
        });
    }

    static getMenuItem = (id: number) => {
        return new Promise((
            resolve: (menuItem: FoodItem) => void,
            reject: (error: any) => void
        ) => {
            fetch(this.apiUri + `dishes/${id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            }).then((response) =>{
                    response.json().then(
                        (itemJson) => {
                            console.log(itemJson);
                            resolve(
                                this.getDish(itemJson.data)
                            );
                        }
                    )
                }
            ).catch((error) => {
                reject('Internal server error' + error.status);
            });
        });
    }

    static addMenuItem = (data: {name: string, description: string, price:number, category: string}) => {
        return new Promise((
            resolve: (success: null) => void,
            reject: (error: any) => void
        ) => {
            console.log("token", localStorage.getItem('jwt'));
            fetch(this.apiUri + 'dishes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                //credentials: 'include',
                body: JSON.stringify({...data})
            }).then((response) => {
                    if (response.status == 200) {
                        resolve(null);
                    } else if (response.status == 400){
                        reject("Invalid dish");
                    } else {
                        reject("Server error");
                    }
                }
            );
    })
    }

    static updateMenuItem = (data: {id: number, name: string, description: string, price:number}) => {
        return new Promise((
            resolve: (success: null) => void,
            reject: (error: any) => void
        ) => {
            console.log("token", localStorage.getItem('jwt'));
            fetch(this.apiUri + `dishes/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                //credentials: 'include',
                body: JSON.stringify({...data})
            }).then((response) => {
                    if (response.status == 200) {
                        resolve(null);
                    } else if (response.status == 400){
                        reject("Invalid dish");
                    } else {
                        reject("Server error");
                    }
                }
            );
        })
    }

    static deleteMenuItem = (data: {id: number}) => {
        return new Promise((
            resolve: (success: null) => void,
            reject: (error: any) => void
        ) => {
            fetch(this.apiUri + `dishes/${data.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                //credentials: 'include',
                body: JSON.stringify({...data})
            }).then((response) => {
                    if (response.status == 204) {
                        resolve(null);
                    } else if (response.status == 400){
                        reject("Invalid dish");
                    } else {
                        reject("Server error");
                    }
                }
            );
        })
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
