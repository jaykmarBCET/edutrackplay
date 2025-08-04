import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('edu_track_play', 'postgres', 'jay@2004', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});
