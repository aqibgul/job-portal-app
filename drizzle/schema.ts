import {
  int,
  text,
  mysqlTable,
  varchar,
  timestamp,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  // id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  userName: varchar("username", { length: 256 }).notNull().unique(),
  userType: mysqlEnum("role", ["Admin", "employee", "applicant"])
    .default("applicant")
    .notNull(),

  email: varchar("email", { length: 256 }).notNull().unique(),
  password: text("password").notNull(),
  confirmPassword: text("confirmPassword").notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at").defaultNow().notNull(),
});
export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: int("user_id").references(() => users.id, { onDelete: "cascade" }),

  userAgent: text("user_agent").notNull(),
  ip: varchar("ip_address", { length: 45 }).notNull(),
  token: varchar("token", { length: 512 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
