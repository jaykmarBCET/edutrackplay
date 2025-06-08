import {Sequelize } from 'sequelize'

const sequelize = new Sequelize('sqlite::memory:')


try{
    sequelize.authenticate();
    console.log('Connection has been established successfully.');

}catch(error){
    console.log(error)
}


export {sequelize}