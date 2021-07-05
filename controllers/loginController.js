const customerController = require('./customerController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "Papá, y tú, ¿qué querías ser de mayor cuando eras pequeño? Y todo cambió...";


class LoginController {

    async validate(mailCheck,passwordCheck){
        let customer = await customerController.mailCustomer(mailCheck);
        if (customer == null){
            throw new Error('Wrong user or password');
        }
        let password = customer.password;

        let verify = await bcrypt.compare(passwordCheck, password);

        if(!verify){
            throw new Error('Wrong user or password');
        }

        if (!customer.isActive) {
            throw new Error("La cuenta no está activa. Por favor, revisa tu correo electrónico y activa tu cuenta.");
          }

        let payload = {
            idUser : customer.id,
            createdAt: new Date,
            admin: customer.admin,
        };


        return jwt.sign(payload, secret);
    }

}

const loginController = new LoginController();
module.exports = loginController;