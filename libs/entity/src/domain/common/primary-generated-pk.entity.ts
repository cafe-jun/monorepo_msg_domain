import { PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { BaseMetaTimeStampEntity } from './base-meta-timestamp.entity';
import { BigIntLiteralType } from 'typescript';

export abstract class PrimaryGeneratedPkEntity extends BaseMetaTimeStampEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  validateId(id: number) {
    const isValidId = this.id == id;
    if (!isValidId) {
    }
  }
}
