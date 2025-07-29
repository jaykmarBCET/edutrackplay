import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('edu_track_play', 'postgres', 'jay@2004', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432, 
  logging: false, 
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to PostgreSQL:', error);
  }
}

connectDB();

export { sequelize };
