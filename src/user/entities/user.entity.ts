import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {


    @PrimaryGeneratedColumn("uuid") 
    id: string;
    @Column()
    name: string;
    @Column({ unique: true })
    email: string;
    @Column()
    password: string;
    @Column({enum: ["admin" , "user"], default: "user"})
    role: string;
    @Column({nullable: true} )
    avatar? :string;
    @Column( {nullable: true} )
    age? : number
    @Column({nullable: true})
    phoneNumber? : string
    @Column({nullable: true})
    address? : string
    @Column({enum: ["true" , "false"], default: "true"})
    active : boolean
    @Column({nullable: true})    
    verificationCode? : string
    @Column({enum: ["male" , "female"], nullable: true})
    gender? : string
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({nullable: true})
    token?: string;

}
