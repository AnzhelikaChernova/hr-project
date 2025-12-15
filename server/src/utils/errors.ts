import { GraphQLError } from 'graphql';

export class AppError extends GraphQLError {
  constructor(
    message: string,
    code: string,
    statusCode: number = 400
  ) {
    super(message, {
      extensions: {
        code,
        statusCode,
      },
    });
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Not authenticated') {
    super(message, 'UNAUTHENTICATED', 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Not authorized') {
    super(message, 'FORBIDDEN', 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND', 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409);
  }
}

export const formatError = (error: GraphQLError) => {
  const extensions = error.extensions || {};

  return {
    message: error.message,
    code: extensions.code || 'INTERNAL_ERROR',
    statusCode: extensions.statusCode || 500,
    path: error.path,
    locations: error.locations,
  };
};
