import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm';
import { Talk } from '../Domain/Models/Talk';

type Domain = typeof Talk['ofObject'] extends (obj: infer T) => any ? T : never;

@Entity({
  name: 'talks'
})
export class TalkModel extends BaseEntity implements Domain {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    name: 'talk_id'
  })
  readonly id!: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 128,
    comment: 'グループの識別子'
  })
  public channel!: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 128,
    comment: 'ユーザーの名前'
  })
  public name!: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 1024,
    comment: 'チャットのメッセージ'
  })
  public message!: string;

  @Column({
    type: 'float',
    unsigned: true,
    nullable: false,
    comment: '投稿時間'
  })
  public time!: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at'
  })
  readonly createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at'
  })
  readonly updatedAt?: Date;

  public static ofDomain(entity: Talk): TalkModel {
    const model = new this();
    const data = entity.toObject();
    Object.assign(model, {
      ...data
    });
    return model;
  }
  public toDomain(): Talk {
    return Talk.ofObject(this);
  }
}
