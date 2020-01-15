import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Score } from "./Score";

@Entity()
export class Component {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @OneToMany(type => Score, score => score.component, { cascade: true, onDelete: 'CASCADE' }) // note: we will create author property in the Photo class below
  score: Score[];
}
