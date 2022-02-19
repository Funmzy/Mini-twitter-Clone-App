import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './userEntity';
import { Like } from './likeEntity';
import { Comment } from './commentEntity';

@Entity()
export class Twit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  twit: string;

  @ManyToOne(() => User, (user) => user.twit)
  user: number;

  @OneToMany(() => Comment, (comment) => comment.twit)
  comment: Comment[];

  @OneToMany(() => Like, (like) => like.twit)
  like: Like[];

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
