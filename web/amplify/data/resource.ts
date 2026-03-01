import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// Task model definition for the MyRoadmap app.
// Authorization: each user can only access their own tasks (owner-based).
const schema = a.schema({
  Task: a
    .model({
      title: a.string().required(),
      description: a.string(),
      status: a.enum(['TODO', 'IN_PROGRESS', 'DONE']),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
