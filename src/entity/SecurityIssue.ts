import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Component } from "./Component";

@Entity({ name: "securityIssues" })
export class SecurityIssue {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  externalId: number;

  @Column()
  impact: Impact;

  @Column()
  path: string;

  @Column()
  package: string;

  @Column()
  moreInfo?: string;

  @Column({nullable: true})
  patchedIn: string;

  @ManyToOne(type => Component, component => component.securityIssues, { nullable: false})
  component: Component;

  /**
     * DB insert time.
     */
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;
}

export enum Impact {
    high = 'high',
    medium = 'medium',
    low = 'low',
}
