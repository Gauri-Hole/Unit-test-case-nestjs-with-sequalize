import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class catAdmin extends Model<catAdmin> {
  @Column
  name: string;

  @Column
  age: number;

  @Column
  breed: string;

  @Column
  info: string;
}