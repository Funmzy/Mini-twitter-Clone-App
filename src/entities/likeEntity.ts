import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Unique, ManyToOne } from 'typeorm';
import { User } from './userEntity';
import { Twit } from './twitEntity';

@Entity()
@Unique(['twit', 'user'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Twit, (twit) => twit, { onDelete: "CASCADE"})
  twit: number;

  @ManyToOne(() => User, (user) => user)
  user: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
