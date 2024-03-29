import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { HistoricLogin } from './historic-login.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => HistoricLogin, (historicLogin) => historicLogin.user)
  historicLogins: HistoricLogin[];
}
