const { Order } = require('../models');
// const { Customer } = require('../models');
const Util = require('../util');


class Rent{

    // Métodos controladores
    async newOrder(body){
        console.log("Estoy en el controller de neworder Body",body);
        let busqueda = await Order.findAll({where: {customerId: body.customerId,movieId: body.movieId}});
        console.log("Encontrado esto : ", busqueda);
        if (busqueda[0]){
            throw new Error("Ya habías adquirido esta película. Ve a tu perfil para poder verla.");
        }

        return Order.create(body);
    }

    async allOrders(){
        console.log("Entro en el controller de allOrders")
        return Order.findAll();
    }

    //Encuentra las ordenes de 1 usuario.
    async orderUser(body){
        let busqueda = await Order.findAll({
            where: {customerId: body.customerId}
        });
        console.log("Datos encontrados: ", busqueda);
        return busqueda;
    }

    async orderId(body){

        return Order.findByPk(body.id);

    }

    async allCities(){

        let ordersFind = await Order.findAll();
        return Util.findCity(ordersFind);
    }

    async byCity(city){
        console.log(city, "esta es la citie que estás buscando");
        let ordersFind = await Order.findAll();
        return Util.findByCity(ordersFind, city);
    }


    async deleteOrder(id){
        return Order.destroy({
            where: {id}
        })
    }
}

let orderController = new Rent();
module.exports = orderController;