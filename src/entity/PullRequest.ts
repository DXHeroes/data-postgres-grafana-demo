import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "pullrequests" })
export class PullRequest {

  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  id: number;

  @ManyToOne(type => User, user => user.uuid)
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
