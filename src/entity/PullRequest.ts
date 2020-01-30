import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "pullrequests" })
export class PullRequest {

  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  id: number;

  @OneToOne(type => User, user => user)
  user: User;

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
