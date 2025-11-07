ALTER TABLE `sessions` DROP INDEX `sessions_token_unique`;--> statement-breakpoint
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_userId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `sessions` ADD `user_id` int;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `userId`;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `token`;