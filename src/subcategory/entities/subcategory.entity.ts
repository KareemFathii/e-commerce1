import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";
@Entity()
export class Subcategory {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    name: string
    @ManyToOne(() => Category, (category) => category.subCategories, { onDelete: "CASCADE" })
    @JoinColumn({ name: "categoryName", referencedColumnName: 'name' }) // to make the fk on the name of the category not the id
    category: Category
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamps: Date


}
