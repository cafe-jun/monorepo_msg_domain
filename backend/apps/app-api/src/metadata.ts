/* eslint-disable */
export default async () => {
  const t = {
    ['../../../libs/entity/src/domain/user/user.entity']: await import(
      '../../../libs/entity/src/domain/user/user.entity'
    ),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import(
            '../../../libs/entity/src/domain/common/base-meta-timestamp.entity'
          ),
          {
            BaseMetaTimeStampEntity: {
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import(
            '../../../libs/entity/src/domain/common/primary-generated-pk.entity'
          ),
          {
            PrimaryGeneratedPkEntity: {
              id: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('../../../libs/entity/src/domain/user/user.entity'),
          {
            User: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
              salt: { required: true, type: () => String },
              nickname: { required: true, type: () => String },
              refreshToken: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./user/dto/user-signup.dto'),
          {
            UserSignUpDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
              nickname: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./user/dto/user-signin.dto'),
          {
            UserSignInDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./app-api.controller'),
          { AppApiController: { getHello: { type: String } } },
        ],
        [
          import('./auth/auth.controller'),
          {
            AuthController: {
              signup: {
                type: t['../../../libs/entity/src/domain/user/user.entity']
                  .User,
              },
              signin: { type: Object },
            },
          },
        ],
      ],
    },
  };
};
