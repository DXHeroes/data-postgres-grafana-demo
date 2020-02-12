import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Component } from "./Component";

@Entity({ name: "codeCoverages" })
export class CodeCoverage {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  externalId: number;

  @Column({ nullable: false })
  recordedAt: Date;

  @ManyToOne(type => Component, component => component.codeCoverages, { nullable: false, onDelete: 'CASCADE' })
  component: Component;

  @Column({ nullable: false, type: "decimal" })
  percentageResult: number;

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
