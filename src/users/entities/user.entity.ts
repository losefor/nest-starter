import { User } from '@prisma/client';
import { PermissionDto } from 'src/permissions/entities/permission.entity';

export class UserDto implements User {
  id: string;
  username: string;
  password: string;
  email: string;
  permissionId: string;
  createdAt: Date;
  updatedAt: Date;

  permission?: PermissionDto;
}
