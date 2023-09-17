import { Entity } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';

@Entity()
export class Message extends PrimaryGeneratedPkEntity {}
