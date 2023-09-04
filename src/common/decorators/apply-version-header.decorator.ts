import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function ApplyVersionHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'version',
      description: 'Set the default value of the current version',
      schema: { default: '1' },
    }),
  );
}
