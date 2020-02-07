import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Score } from "./Score";
import { PullRequest } from "./PullRequest";
import { Issue } from "./Issue";
import { SecurityIssue } from "./SecurityIssue";

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

  @Column({ nullable: true})
  language: Language;

  @Column({ nullable: true})
  platform: Platform;

  @OneToMany(type => Score, score => score.component, { cascade: true, onDelete: 'CASCADE' })
  score: Score[];

  @OneToMany(type => PullRequest, pullRequest => pullRequest.uuid)
  pullRequest: PullRequest[];

  @OneToMany(type => Issue, issue => issue.uuid)
  issue: Issue[];
  
  @OneToMany(type => SecurityIssue, securityIssue => securityIssue.uuid)
  securityIssue: SecurityIssue[];

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

export interface LanguageAndPlatform {
  language: Language,
  platfrom: Platform,
}

export enum Language {
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
  CSharp = 'CSharp',
  Python = 'Python',
}

export enum Platform {
  FrontEnd = 'FrontEnd',
  BackEnd = 'BackEnd',
}
