import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseMetaTimeStampEntity } from './base-meta-timestamp.entity';

export abstract class PrimaryGeneratedPkEntity extends BaseMetaTimeStampEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
}
