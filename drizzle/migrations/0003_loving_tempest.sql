ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `users` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `id`;