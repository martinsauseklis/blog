import { BlogEntryEntity } from "src/blog/model/blog-entry.entity";
import { BeforeInsert, Column, ColumnTypeUndefinedError, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.interface";



@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn() //izveido automātiski ģenerētu primāro kolonnu, kas automātiski inkrementējas
    id: number;
    @Column()
    name: string;
    @Column({unique: true})
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;
    @Column({nullable: true})
    profileImage: string;
    @OneToMany(type => BlogEntryEntity, blogEntryEntity => blogEntryEntity.author)
    blogEntries: BlogEntryEntity[];
    @BeforeInsert()
    emailToLowerCase() {
        this.email.toLowerCase();
    }
}