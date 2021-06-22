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
        return Customer.findOne({
            where: {email}
        })
    }

    async customerId(id){

        return Customer.findByPk(id);

    }

    // async newCustomer(body){
    //     console.log("Recibimos los datos en el controlador: ", body);
    //     let password = body.password;
    //     let passwordHashed = bcrypt.hashSync(password, 10);
    //     body.password = passwordHashed;
    //     return Customer.create(body);
    // }




    async newCustomer(user) {
    
        user.password = await bcrypt.hash(user.password, 10);
        
        console.log("Datos que recibimos en customerController: ", user);

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
        console.log(user);

        let usuario = await Customer.create(user);
        console.log("usuario creado", usuario);
    
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
        return Customer.update(
            //Datos que cambiamos
            {phone: attributes.phone, address: attributes.address, city: attributes.city, postalcode: attributes.postalcode},
            //Donde..
            {where: {id: attributes.id}}
        )
    }
}

let customerController = new Client();
module.exports = customerController;