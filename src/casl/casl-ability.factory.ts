import { Injectable } from '@nestjs/common';
import {
  AbilityClass,
  AbilityBuilder,
  PureAbility,
  Subject,
} from '@casl/ability';
import { Prisma } from '@prisma/client';

export type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type Subjects = Prisma.ModelName | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

enum Letter {
  c = 'c',
  r = 'r',
  u = 'u',
  d = 'd',
}

function getAction(letter: Letter): Action {
  switch (letter) {
    case 'c': {
      return 'create';
    }

    case 'r': {
      return 'read';
    }

    case 'u': {
      return 'update';
    }

    case 'd': {
      return 'delete';
    }
  }
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any) {
    const {
      can: allow,
      cannot: forbid,
      build,
    } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(
      PureAbility as AbilityClass<AppAbility>,
    );

    const permissions = user.role;

    if (user.role.enName === 'Root') {
      allow('manage', 'all'); // read-write access to everything
    } else {
      // Default permissions to noe
      forbid('manage', 'all');

      // Detect permissions from the user role
      for (const subject in permissions) {
        if (typeof permissions[subject] === 'string') {
          for (const letter of permissions[subject] as Letter[]) {
            // Because currently some users have a boolean in their permissions
            allow(getAction(letter), subject as Subjects);
          }
        }
      }
    }

    return build();
  }
}
