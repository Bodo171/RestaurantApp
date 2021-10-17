import { Menu } from "../model/Menu";

export default class Service{
    static apiUri = '';
    static dummy = true;

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

    static reserveTable = (data: {name:string, day:string, hour: string, persons: number, phone: string}) => {
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
}