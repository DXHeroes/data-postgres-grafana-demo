import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Score } from "./Score";
import { PullRequest } from "./PullRequest";
import { Issue } from "./Issue";
import { SecurityIssue } from "./SecurityIssue";
import { CodeCoverage } from "./CodeCoverage";
import { User } from "./User";

@Entity({ name: "components" })
export class Component {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  path: string;

  @Column({ nullable: true})
  language: Language;

  @Column({ nullable: true})
  platform: Platform;

  @OneToMany(type => User, user => user.component, { cascade: true, onDelete: 'CASCADE' })
  users: User[];

  @OneToMany(type => Score, score => score.component, { cascade: true, onDelete: 'CASCADE' })
  scores: Score[];

  @OneToMany(type => CodeCoverage, codeCoverage => codeCoverage.id, { cascade: true, onDelete: 'CASCADE' })
  codeCoverages: CodeCoverage[];

  @OneToMany(type => PullRequest, pullRequest => pullRequest.id, { cascade: true, onDelete: 'CASCADE' })
  pullRequests: PullRequest[];

  @OneToMany(type => Issue, issue => issue.id, { cascade: true, onDelete: 'CASCADE' })
  issues: Issue[];
  
  @OneToMany(type => SecurityIssue, securityIssue => securityIssue.id, { cascade: true, onDelete: 'CASCADE' })
  securityIssues: SecurityIssue[];

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
