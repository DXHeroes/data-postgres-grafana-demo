import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    uuid: number;

    @Column()
    id: string;

    @Column()
    login: string;

    @Column()
    url: string;
    /**
     * DB insert time.
     */
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    /**
     * DB last update time.
     */
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}
