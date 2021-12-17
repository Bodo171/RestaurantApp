import { Menu } from "../model/Menu";
import { User } from "../model/User";
import {FoodItem} from "../model/FoodItem";
import {Reservation} from "../model/Reservation";

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

    static getReservation: (reservationJson: any) => Reservation = (reservationJson) => {
        return {
            id: reservationJson.id,
            date: reservationJson.attributes.date,
            phone_number: reservationJson.attributes.phone_number,
            confirmed: reservationJson.attributes.confirmed,
            table_size: reservationJson.attributes.table_size
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

    static addMenuItem = (data: {name: string, description: string, price:number, category: string, image: File}) => {
        return new Promise((
            resolve: (success: null) => void,
            reject: (error: any) => void
        ) => {
            console.log(data);
            let formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', String(data.price));
            formData.append('category', data.category);
            formData.append('image', data.image, data.image.name);


            fetch(this.apiUri + 'dishes/', {
                method: 'POST',
                headers: {
                    //'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                body: formData
            }).then((response: Response) => {
                    if (response.status === 200) {
                        resolve(null);
                    } else if (response.status === 400){
                        reject("Invalid dish");
                    } else {
                        reject("Server error");
                    }
                }
            );
        });
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
                    if (response.status === 200) {
                        resolve(null);
                    } else if (response.status === 400){
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

    static reserveTable = (data: {name: string, day: string, hour: string, table_size: number, phone: string}) => {
        return new Promise((
            resolve: (result: null) => void,
            reject: (error: any) => void
        ) => {
            fetch(this.apiUri + 'reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: '2021-12-21T11:30',
                    table_size: data.table_size,
                    phone_number: data.phone
                })
            }).then((response) => {
                if (response.status >= 400) reject('Cererea ta nu s-a putut procesa. Incearca mai tarziu!');
                else resolve(null);
            });
        });
    }

    static getReservations = () => {
        return new Promise((
            resolve: (result: Array<Reservation>) => void,
            reject: (error: any) => void
        ) => {
                fetch(this.apiUri + 'reservations', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                    },
                }).then((response) =>{
                        response.json().then(
                            (reservationsJson) => {
                                resolve(
                                    reservationsJson.data.map(this.getReservation)
                                );
                            }
                        )
                    }
                ).catch((error) => {
                    reject('Internal server error' + error.status);
                });
            });
    }

    static confirmReservation(data: {id: number, confirmed: string}){
        return new Promise((
            resolve: (success: null) => void,
            reject: (error: any) => void
        ) => {
            console.log("token", localStorage.getItem('jwt'));
            fetch(this.apiUri + `reservations/${data.id}/confirm`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                body: JSON.stringify(
                    {confirmed: data.confirmed}
                )
            }).then((response) => {
                    if (response.status === 200) {
                        resolve(null);
                    } else if (response.status === 400){
                        reject("Invalid request");
                    } else {
                        reject("Server error");
                    }
                }
            );
        })
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
