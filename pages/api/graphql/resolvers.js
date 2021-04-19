import db from "../../../lib/db";
import { Datetime, Bit } from "./scalars";

/* RESOLVERS */

export const resolvers = {
  Query: {
    // Get user by ID
    getUser: async (_, args) => {
      try {
        const user = await db.query(`
          SELECT * FROM users
          WHERE user_id='${args.user_id}'
        `)
        return {
          user_id: user[0].user_id, 
          email: user[0].email,
          username: user[0].username, 
          password: user[0].password, 
          admin: user[0].admin,
          authenticated: user[0].authenticated, 
          image: user[0].image, 
          dateCreated: user[0].dateCreated, 
          lastLoggedIn: user[0].lastLoggedIn
        };
      } catch (error) {
        throw error;
      }
    },
    getUserByUsername: async (_, args) => {
      try {
        const user = await db.query(`
          SELECT * FROM users
          WHERE username='${args.username}'
        `)
        return {
          user_id: user[0].user_id, 
          email: user[0].email,
          username: user[0].username, 
          password: user[0].password, 
          admin: user[0].admin,
          authenticated: user[0].authenticated, 
          image: user[0].image, 
          dateCreated: user[0].dateCreated, 
          lastLoggedIn: user[0].lastLoggedIn
        };
      } catch (error) {
        throw error;
      }
    },
    getFollowers: async (_, args) => {
      try {
        const users = await db.query(`
          SELECT * FROM users
          WHERE username IN (
            SELECT follower FROM followers
            WHERE username='${args.username}' 
          );
        `)
        return users.map(({ 
          user_id, email, username, password, admin,
          authenticated, image, dateCreated, lastLoggedIn
        }) => ({
          user_id, email, username, password, admin,
          authenticated, image, dateCreated, lastLoggedIn
        }));
      } catch (error) {
        throw error;
      }
    },
    getFollowing: async (_, args) => {
      try {
        const users = await db.query(`
          SELECT * FROM users
          WHERE username IN (
            SELECT username FROM followers
            WHERE follower='${args.follower}'
          );
        `)
        return users.map(({ 
          user_id, email, username, password, admin,
          authenticated, image, dateCreated, lastLoggedIn
        }) => ({
          user_id, email, username, password, admin,
          authenticated, image, dateCreated, lastLoggedIn
        }));
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    followUser: async (_, args) => {
      try {
        const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const users = await db.query(`
          INSERT INTO followers(username, follower, dateCreated)
          VALUES('${args.username}', '${args.follower}', '${datetime}')
        `)
        // handle errors like dup entry
        if (users.error) return { void: users.error.message }
        return { void: null }
      } catch (error) {
        throw error;
      }
    },
    unfollowUser: async (_, args) => {
      try {
        const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const users = await db.query(`
        DELETE FROM followers 
        WHERE username='${args.username}' AND follower='${args.follower}'
        `)
        // handle errors like dup entry
        if (users.error) return { void: users.error.message }
        return { void: null }
      } catch (error) {
        throw error;
      }
    },
  },
  Datetime,
  Bit
};