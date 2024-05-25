// src/models/Patient.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'patients' })
export class Patient extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthDate!: Date;
}
