import { Entity ,Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column({unique: true, nullable: true})
    image?: string
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    timestamps: Date
}