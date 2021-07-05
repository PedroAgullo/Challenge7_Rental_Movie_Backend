const { Order } = require('../models');
// const { Customer } = require('../models');
const Util = require('../util');


class Rent{

    // Métodos controladores
    async newOrder(body){
        let busqueda = await Order.findAll({where: {customerId: body.customerId,movieId: body.movieId}});
        if (busqueda[0]){
            throw new Error("Ya habías adquirido esta película. Ve a tu perfil para poder verla.");
        }

        return Order.create(body);
    }

    async allOrders(){
        return Order.findAll();
    }



        //Encuentra las orders de 1 tipo - admin.
        async orderType(body){

            let busqueda = await Order.findAll({
                where: {type: body.type}
            });
            return busqueda;
        }
        



    //Encuentra las ordenes de 1 usuario.
    async orderUser(body){
        let busqueda = await Order.findAll({
            where: {customerId: body.customerId}
        });
        return busqueda;
    }

        //Encuentra las ordenes de 1 usuario.
        async orderUserMovie(body){
            let busqueda = await Order.findAll({
                where: {customerId: body.customerId}
            });
            return busqueda;
        }

    async orderIdType(body){

        let busqueda = await Order.findAll({
            where: {customerId: body.id, type: body.type}
        });
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