import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Component } from "./Component";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    externalId: number;

    @Column()
    login: string;

    @Column()
    url: string;
    /**
     * DB insert time.
     */
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @ManyToOne(type => Component, component => component.securityIssues, { nullable: false})
    component: Component;
  
    /**
     * DB last update time.
     */
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}
