import { Permission } from '@prisma/client';

export class PermissionDto implements Permission {
  id: string;
  nameId: string;
  uniqueName: string;
  createdAt: Date;
  updatedAt: Date;
  Image: string;
}
