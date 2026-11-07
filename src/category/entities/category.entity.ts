import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subcategory } from "../../subcategory/entities/subcategory.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ unique: true})
    name: string;
    @Column({ unique: true, nullable: true })
    image?: string
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamps: Date
    @OneToMany(() => Subcategory , (subCategory)=>subCategory.category)
    subCategories: Subcategory[]
}
