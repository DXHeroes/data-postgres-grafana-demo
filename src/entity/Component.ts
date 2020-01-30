import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Score } from "./Score";

@Entity({ name: "components" })
export class Component {

  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @OneToMany(type => Score, score => score.component, { cascade: true, onDelete: 'CASCADE' }) // note: we will create author property in the Photo class below
  score: Score[];

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
