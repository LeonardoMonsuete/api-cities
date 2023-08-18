import { Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class City {
    @PrimaryGeneratedColumn();
    id: number

    @Column()
    nome: string

    @Column()
    estado: Int
