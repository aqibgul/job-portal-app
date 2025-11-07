ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `sessions` MODIFY COLUMN `user_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `token` varchar(512) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_token_unique` UNIQUE(`token`);--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;