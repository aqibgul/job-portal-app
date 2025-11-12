import {
  int,
  text,
  mysqlTable,
  varchar,
  timestamp,
  mysqlEnum,
  serial,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  f_name: varchar("name", { length: 255 }).notNull(),
  userName: varchar("username", { length: 255 }).notNull().unique(),
  userType: mysqlEnum("role", ["Admin", "employee", "applicant"])
    .default("applicant")
    .notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  confirmPassword: text("confirmPassword").notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at").defaultNow().notNull(),
});
export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  userAgent: text("user_agent").notNull(),
  ip: varchar("ip_address", { length: 255 }).notNull(),
  // token: varchar("token", { length: 512 }).unique().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
