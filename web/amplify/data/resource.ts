import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// Task model definition for the MyRoadmap app.
// Authorization: each user can only access their own tasks (owner-based).
const schema = a.schema({
  Task: a
    .model({
      title: a.string().required(),
      description: a.string(),
      status: a.enum(['TODO', 'IN_PROGRESS', 'DONE']),
      priority: a.enum(["LOW", "MEDIUM", "HIGH"]),
      dueDate: a.date(),
      category: a.string(),
      subtasks: a.string().array(),
      estimatedHours: a.float(),
      actualHours: a.float(),
      tags: a.string().array(),
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
