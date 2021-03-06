const { Customer } = require('../models'); //No necesita indicarle el archivo, solo la carpeta, ya que lo desestructura desde index.js
const bcrypt = require('bcrypt');
const nodemailer = require('../config/nodemailerConfig.js');



class Client {

    async allCustomer(){

        return Customer.findAll();

    }

    async nameCustomer(name){
        return Customer.findOne({
            where: {name}
        })
    }

    async mailCustomer(email){

         let resultado = await Customer.findOne({
            where: {email}
        })
        return resultado;
    }

    async dniCustomer(dni){
        return Customer.findOne({
            where: {dni}
        })
    }

    async customerId(id){

        return Customer.findByPk(id);
    }

    async newCustomer(user) {
    
        user.password = await bcrypt.hash(user.password, 10);
        
        //Creamos una token que enviamos por mail para activar
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length )];
        }
        user = {
          name : user.name,
          lastName1: user.lastName1,
          lastName2: user.lastName2,
          email: user.email,
          password: user.password,
          birthday: user.birthday,
          address: user.address,
          country: user.country,
          city: user.city,
          dni: user.dni,
          telephone: user.phone,
          subscription: user.subscription,
          token: token
        }

        let usuario = await Customer.create(user);
    
        //Llamamos a la funcion para enviar el correo al usuario.
        
        await nodemailer.sendConfirmationEmail(user.name, user.email, token);
    
        return usuario;
      }
    
      async findByToken(token) {
        return Customer.findAll({where:{ token: token }});
      }

      //Activa la cuenta del usuario buscando la token dada por el parámetro.
      async updateActive(token) {

        let user = await Customer.findOne({where:{token}});

        let usuario = await Customer.update(
            {
                isActive: true,
              },

              {where: {id: user.id}}

        );
    
        let resultado = "La cuenta se ha activado correctamente. Por favor, ve a la web de xSmileFitness para entrar en tu área de usuario.";
    
        return resultado;
      }


    async deleteCustomer(id){
        return Customer.destroy({
            where: {id}
        })
    }

    async modifyCustomer(attributes){
        console.log(attributes);
       await  Customer.update(
            //Datos que cambiamos
            {phone: attributes.phone, address: attributes.address, city: attributes.city, postalcode: attributes.postalcode},
            //Donde..
            {where: {id: attributes.id}}
        )

        let resultado = this.customerId(attributes.id);

        return resultado;
    }

    async modifyInfantil(attributes){
        await  Customer.update(
             //Datos que cambiamos
             {infantil: attributes.infantil},
             //Donde..
             {where: {id: attributes.idUser}}
         )
 
         let resultado = this.customerId(attributes.idUser);
 
         return resultado;
     }

     async modifyPremium(attributes){
        await  Customer.update(
             //Datos que cambiamos
             {premium: attributes.premium},
             //Donde..
             {where: {id: attributes.id}}
         )
 
         let resultado = this.customerId(attributes.id);
 
         return resultado;
     }

    }

let customerController = new Client();
module.exports = customerController;