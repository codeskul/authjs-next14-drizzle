import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as users from "./schema/users";

export const db = drizzle(sql, { schema: { ...users } });
