import { SetMetadata } from '@nestjs/common';
import { Subjects } from '../../casl/casl-ability.factory';
export const SUBJECT = 'subject';

export const CheckPermissionsFor = (subject: Subjects) =>
  SetMetadata('subject', subject);
