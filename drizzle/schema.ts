import { relations } from "drizzle-orm";
import {
  int,
  text,
  mysqlTable,
  varchar,
  timestamp,
  mysqlEnum,
  serial,
  year,
  date,
} from "drizzle-orm/mysql-core";
import { string } from "zod";

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
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),

  userAgent: text("user_agent").notNull(),
  ip: varchar("ip_address", { length: 255 }).notNull(),
  // token: varchar("token", { length: 512 }).unique().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const employers = mysqlTable("employers", {
  id: int("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  avatarUrl: text("avatar_url"),
  bannerUrl: text("banner_url"),
  organizationType: varchar("organization_type", { length: 100 }),
  teamSize: varchar("team_size", { length: 50 }),
  yearFounded: year("year_founded"),
  websiteUrl: varchar("website_url", { length: 255 }),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
  deletedAt: timestamp("deleted_at", { mode: "string" }).defaultNow().notNull(),
});

export const applicants = mysqlTable("applicants", {
  id: int("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  biography: text("biography"),
  dateOfBirth: date("date_of_birth", { mode: "string" }),
  nationality: varchar("nationality", { length: 100 }),
  martialStatus: mysqlEnum("martial_status", [
    "single",
    "married",
    "divorced",
    "widowed",
  ]),
  gender: mysqlEnum("gender", ["male", "female", "other"]),
  education: mysqlEnum("education", [
    "none",
    "high_school",
    "bachelor",
    "master",
    "phd",
    "other",
  ]),
  experience: text("experience"),
  skills: text("skills"),
  location: varchar("location", { length: 255 }),
  webSiteUrl: varchar("website_url", { length: 255 }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
  deletedAt: timestamp("deleted_at", { mode: "string" }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  session: many(sessions),
  employer: one(employers, {
    fields: [users.id],
    references: [employers.id],
  }),
  applicant: one(applicants, {
    fields: [users.id],
    references: [applicants.id],
  }),
}));
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
