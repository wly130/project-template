import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'table'})
export class Table {
    @PrimaryGeneratedColumn({name: 'id', type: 'int'})
    Id: number;

    @Column({name: 'name', type: 'varchar', length: 255})
    name: string;

    @Column({name: 'create_date', type: 'datetime'})
    createDate: Date;
}