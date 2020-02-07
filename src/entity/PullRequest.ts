import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Component } from "./Component";

@Entity({ name: "pullrequests" })
export class PullRequest {

  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  id: number;

  @ManyToOne(type => User, user => user.uuid)
  user: User;

  @ManyToOne(type => Component, component => component.id)
  component: string;

  @Column()
  path: string;

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
