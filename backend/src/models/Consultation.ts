// src/models/Consultation.ts
import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Patient } from './Patient';
import { User } from './User';

@Table({ tableName: 'consultations' })
export class Consultation extends Model {
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  patientId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  officerId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  consultationType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  medicalCondition!: string;

  @BelongsTo(() => Patient)
  patient!: Patient;

  @BelongsTo(() => User)
  officer!: User;
}

// Define a type for the creation attributes
export type ConsultationCreationAttributes = {
  patientId: number;
  officerId: number;
  consultationType: string;
  medicalCondition: string;
};
