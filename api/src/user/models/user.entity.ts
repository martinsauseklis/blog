import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn() //izveido automātiski ģenerētu primāro kolonnu, kas automātiski inkrementējas
    id: number;
    @Column()
    name: string;
    @Column({unique: true})
    username: string;
}