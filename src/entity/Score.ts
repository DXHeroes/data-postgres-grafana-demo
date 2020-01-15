import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Component } from "./Component";

@Entity()
export class Score {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  recordedAt: string;

  @ManyToOne(type => Component, component => component.score, { nullable: false, onDelete: 'CASCADE' })
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

}
