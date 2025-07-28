import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './sqlite.db', // ✅ creates a local file
  logging: false,         // ✅ no extra `{` here!
})

async function connectDB() {
  try {
    await sequelize.authenticate()
    console.log('✅ Connection has been established successfully.')
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error)
  }
}

connectDB()

export { sequelize }
