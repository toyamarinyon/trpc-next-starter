/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from 'server/createRouter';
import { z } from 'zod';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(1), ms));
}

export const postRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1).max(32),
      text: z.string().min(1),
    }),
    async resolve() {
      await sleep(2000);
      return {
        name: 'hello!',
      };
    },
  })
  // read
  .query('all', {
    async resolve() {
      await sleep(2000);
      return [
        {
          id: 1,
          title: 'hello!',
        },
        {
          id: 2,
          title: 'trpc!',
        },
      ];
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve() {
      await sleep(2000);
      return {
        id: 1,
        title: 'hello!',
        text: 'this is test text!',
        createdAt: new Date(),
      };
    },
  });
