import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Component } from "./Component";

@Entity({ name: "issues" })
export class Issue {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  externalId: number;

  @ManyToOne(type => User, user => user.id)
  user: User;

  @ManyToOne(type => Component, component => component.issues, { nullable: false})
  component: Component;

  @Column()
  path: string;

  @Column({nullable: true})
  pullRequestUrl: string;

  @Column()
  state: string;

  @Column({nullable: true})
  mergedAt?: Date;

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
