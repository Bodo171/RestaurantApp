import { Menu } from "../model/Menu";
import { User } from "../model/User";

export default class Service{
    static apiUri = 'https://restaurant-bckend.herokuapp.com/';
    static dummy = false;

    static getMenu = () => {
        return new Promise((
            resolve: (menu: Menu) => void,
            reject: (error: any) => void
        ) => {
            if (Service.dummy){
                const dummyMenu: Menu = {
                    breakfast: [
                        { name: 'Omleta cu banane', description: 'O omleta in care se pun 2 banane prajite', price: 7, image: 'img/breakfast_item.jpg' },
                        { name: 'Castraveti murati', description: 'De douzeci de ani', price: 10, image: 'img/breakfast_item.jpg' },
                        { name: 'Tuica din Mihaiesti', description: 'E 7 lei vrei sa gusti?', price: 7, image: 'img/breakfast_item.jpg' },
                        { name: 'Omleta cu banane 2', description: 'O omleta in care se pun 2 banane prajite', price: 5, image: 'img/breakfast_item.jpg' },
                        { name: 'Surpriza', description: 'Punem cate putin din tot ce avem in bucatarie', price: 21, image: 'img/breakfast_item.jpg' },
                    ],
                    lunch: [
                        { name: 'Pulpe de broasca', description: '200g pulpe de broasca pe vatra', price: 17, image: 'img/lunch_item.jpg' },
                        { name: 'Hreac caramelizat', description: 'Hreac cu caramel sarat', price: 14, image: 'img/lunch_item.jpg' }
                    ],
                    dinner: [
                        { name: 'Gandaci din Vatra Dornei', description: '50g gandaci deosebiti culesi de experti zoofili', price: 35, image: 'img/dinner_item.jpg' },
                        { name: 'Piure din parizer cu lapte', description: '150g parizer cu 300ml lapte si 35g sare in blender', price: 47, image: 'img/dinner_item.jpg' },
                        { name: 'Corn cu ciocolata', description: 'Exact', price: 3, image: 'img/dinner_item.jpg' }
                    ]
                };
                setTimeout(()=>{
                    resolve(dummyMenu);
                }, 1500);
            }else{
                fetch(Service.apiUri + '/menu')
                    .then((json) => {
                        //parse data... resolve
                    })
                    .catch((reason) => {
                        reject(reason);
                    })
            }
        });
    }

    static reserveTable = (data: {name: string, day: string, hour: string, persons: number, phone: string}) => {
        return new Promise((
            resolve: (result: null) => void,
            reject: (error: any) => void
        ) => {
            if (Service.dummy){
                setTimeout(() => {
                    if (data.name === 'fail') reject('Cererea ta nu s-a putut procesa. Incearca mai tarziu!');
                    else resolve(null);
                }, 2000);
            }else{
                fetch(Service.apiUri + '/...', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
                    .then((success) => { resolve(null) })
                    .catch((error) => { reject(error) });
            }
        });
    }

    static login = (data: {email: string, password: string}) => {
        return new Promise((
            resolve: (success: null) => void,
            reject: (error: any) => void
        ) => {
            if (Service.dummy){
                reject('Cannot login in dummy mode!');
                return;
            }
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
            if (Service.dummy){
                reject('Cannot logout in dummy mode!');
                return;
            }
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