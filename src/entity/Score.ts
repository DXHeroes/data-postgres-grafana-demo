import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Component } from "./Component";

@Entity({ name: "scores" })
export class Score {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  recordedAt: Date;

  @ManyToOne(type => Component, component => component.scores, { nullable: false, onDelete: 'CASCADE' })
  component: Component;

  @Column({ nullable: false })
  practicingPractices: number;

  @Column({ nullable: false })
  notPracticingPractices: number;

  @Column({ nullable: false })
  skippedPractices: number;

  @Column({ nullable: false })
  failedPractices: number;

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
