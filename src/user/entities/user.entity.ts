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
    @Column( )
    avatar :string;
    @Column()
    age : number
    @Column()
    phoneNumber : string
    @Column()
    address : string
    @Column({enum: ["true" , "false"], default: "true"})
    active : boolean
    @Column()    
    verificationCode : string
    @Column({enum: ["male" , "female"]})
    gender : string
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}
